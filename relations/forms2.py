import re

from django.contrib.contenttypes.models import ContentType
from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout
from crispy_forms.bootstrap import Accordion, AccordionGroup
import autocomplete_light.shortcuts as al
from django.utils.translation import ugettext_lazy as _
from django.db.models import Q

from metainfo.models import TempEntityClass, Uri, Text
from helper_functions.RDFparsers import GenericRDFParser
from highlighter.models import Annotation
from relations.tables import *


class GenericRelationForm(forms.ModelForm):

    class Meta:
        model = TempEntityClass
        fields = ['start_date_written', 'end_date_written', 'references', 'notes']
        labels = {
            'start_date_written': _('Start'),
            'end_date_written': _('End'),
        }

    def save(self, site_instance, instance=None, commit=True):
        """
        Save function of the GenericRelationForm.
        :param site_instance: Instance where the form is used on
        :param instance: PK of the relation that is saved
        :param commit: Whether to already commit the save.
        :type site_instance: object
        :type instance: int
        :type commit: bool
        :rtype: object
        :return: instance of relation
        """
        cd = self.cleaned_data
        if instance:
            x = self.relation_form.objects.get(pk=instance)
        else:
            x = self.relation_form()
        x.relation_type_id = cd['relation_type']
        x.start_date_written = cd['start_date_written']
        x.end_date_written = cd['end_date_written']
        x.notes = cd['notes']
        x.references = cd['references']
        setattr(x, self.rel_accessor[3], site_instance)
        target = ContentType.objects.get(app_label='entities', model=self.rel_accessor[0].lower()).model_class()
        t1 = target.get_or_create_uri(cd['target_uri'])
        if not t1:
            t1 = GenericRDFParser(cd['target_uri'], self.rel_accessor[0]).get_or_create()
        setattr(x, self.rel_accessor[2], t1)
        if commit:
            x.save()
        if self.highlighter:
            if not commit:
                x.save()
            txt = Text.objects.get(pk=cd['HL_text_id'][5:])
            a = Annotation(
                start=cd['HL_start'],
                end=cd['HL_end'],
                text=txt,
                user_added=self.request.user,
                annotation_project_id=int(self.request.session.get('annotation_project', 1)))
            a.save()
            a.entity_link.add(x)
        return x

    def get_text_id(self):
        """
        Function to retrieve the highlighted text.
        :return: ID of text that was highlighted
        """
        return self.cleaned_data['HL_text_id'][5:]

    def get_html_table(self, entity_type, request, site_instance, form_match):
        table = globals()[self.relation_form.__name__+'Table']
        prefix = re.match(r'([A-Z][a-z])[^A-Z]*([A-Z][a-z])', self.relation_form.__name__)
        prefix = prefix.group(1)+prefix.group(2)+'-'
        if form_match.group(1) == form_match.group(2):
            list_rel = []
            dic_a = {'related_'+entity_type.lower()+'A': site_instance}
            dic_b = {'related_' + entity_type.lower() + 'B': site_instance}
            for x in self.relation_form.annotation_links.filter_ann_proj(request=request).filter(
                            Q(**dic_a) | Q(**dic_b)):
                list_rel.append(x.get_table_dict(site_instance))
            print('list_rel: {}'.format(list_rel))
            table_html = table(list_rel, prefix=prefix)
        else:
            tab_query = {'related_'+entity_type.lower(): site_instance}
            table_html = table(self.relation_form.annotation_links.filter_ann_proj(request=request).filter(**tab_query),
                               entity=entity_type,
                               prefix=prefix)
        return table_html

    def __init__(self, siteID=None, highlighter=False, *args, **kwargs):
        """
        Generic Form for relations.
        :param siteID: ID of the entity the form is used on
        :param entity_type: Entity type of the entity the form is used on
        :param relation_form: Type of relation form.
        :param instance: instance of relation.
        :param highlighter: whether the form is used in the highlighter
        :type siteID: int
        :type entity_type: object or int
        :type relation_form: object or int
        :type instance: object
        :type highlighter: bool
        """

        css_notes = 'LS'
        self.highlighter = highlighter
        entity_type = kwargs.pop('entity_type')
        if type(entity_type) != str:
            entity_type = entity_type.__name__
        self.relation_form = kwargs.pop('relation_form')
        if type(self.relation_form) == str:
            self.relation_form = ContentType.objects.get(app_label='relations', model=self.relation_form.lower()).model_class()
        self.request = kwargs.pop('request', False)
        super(GenericRelationForm, self).__init__(*args, **kwargs)
        instance = getattr(self, 'instance', None)
        self.fields['relation_type'] = forms.CharField(label='Relation type', required=True)
        self.helper = FormHelper()
        self.helper.form_class = '{}Form'.format(str(self.relation_form))
        self.helper.form_tag = False
        lst_src_target = re.findall('[A-Z][^A-Z]*', self.relation_form.__name__)
        if lst_src_target[0] == lst_src_target[1]:
            if instance and instance.id:
                if getattr(instance, 'related_{}A_id'.format(lst_src_target[0].lower())) == int(siteID):
                    self.rel_accessor = (lst_src_target[1], True,
                                         'related_{}B'.format(lst_src_target[1].lower()),
                                         'related_{}A'.format(lst_src_target[0].lower()))
                else:
                    self.rel_accessor = (lst_src_target[1], False,
                                         'related_{}A'.format(lst_src_target[1].lower()),
                                         'related_{}B'.format(lst_src_target[0].lower()))
            else:
                self.rel_accessor = (lst_src_target[1], True,
                                     'related_{}B'.format(lst_src_target[1].lower()),
                                     'related_{}A'.format(lst_src_target[0].lower()))
            self.fields['relation_type'].widget = al.ChoiceWidget(
                'VC{}{}Autocomplete'.format(lst_src_target[0], lst_src_target[1]))
            self.fields['target'] = forms.CharField(label=lst_src_target[1],
                                                    widget=al.TextWidget('{}Autocomplete'.format(lst_src_target[1])))
            self.fields['target_uri'] = forms.CharField(required=False, widget=forms.HiddenInput())
        elif entity_type == lst_src_target[0]:
            self.rel_accessor = (lst_src_target[1], True,
                                 'related_{}'.format(lst_src_target[1].lower()),
                                 'related_{}'.format(lst_src_target[0].lower()))
            self.fields['relation_type'].widget = al.ChoiceWidget('VC{}{}Autocomplete'.format(lst_src_target[0], lst_src_target[1]))
            self.fields['target'] = forms.CharField(label=lst_src_target[1],
                                                    widget=al.TextWidget('{}Autocomplete'.format(lst_src_target[1])))
            self.fields['target_uri'] = forms.CharField(required=False, widget=forms.HiddenInput())
        elif entity_type == lst_src_target[1]:
            self.rel_accessor = (lst_src_target[0], False,
                                 'related_{}'.format(lst_src_target[0].lower()),
                                 'related_{}'.format(lst_src_target[1].lower()))
            self.fields['relation_type'].widget = al.ChoiceWidget(
                'VC{}{}ReverseAutocomplete'.format(lst_src_target[0], lst_src_target[1]))
            self.fields['target'] = forms.CharField(label=lst_src_target[0],
                                                    widget=al.TextWidget('{}Autocomplete'.format(lst_src_target[0])))
            self.fields['target_uri'] = forms.CharField(required=False, widget=forms.HiddenInput())
        else:
            print('no hit rel_accessor')
        if instance and instance.id:
            self.fields['target'].initial = str(getattr(instance, self.rel_accessor[2]))
            self.fields['target_uri'].initial = Uri.objects.filter(
                entity=getattr(instance, self.rel_accessor[2]))[0]
            if self.rel_accessor[1]:
                auto_acc = 'VC{}{}Autocomplete'.format(lst_src_target[0], lst_src_target[1])
                auto_choices = [instance.relation_type.label]
            else:
                auto_acc = 'VC{}{}ReverseAutocomplete'.format(lst_src_target[0], lst_src_target[1])
                auto_choices = [instance.relation_type.label_reverse]
            self.fields['relation_type'].widget = al.ChoiceWidget(
                auto_acc,
                extra_context={'values': [instance.relation_type.pk],
                               'choices': auto_choices})
        if highlighter:
            css_notes = 'HL'

        self.helper.layout = Layout(
            'relation_type',
            'target',
            'target_uri',
            'start_date_written',
            'end_date_written',
            Accordion(
                AccordionGroup(
                    'Notes and References',
                    'notes',
                    'references',
                    active=False,
                    css_id="{}_{}_notes_refs".format(self.relation_form.__name__, css_notes))))

        if highlighter:
            self.fields['HL_start'] = forms.IntegerField(widget=forms.HiddenInput)
            self.fields['HL_end'] = forms.IntegerField(widget=forms.HiddenInput)
            self.fields['HL_text_id'] = forms.CharField(widget=forms.HiddenInput)
            self.helper.layout.extend([
                'HL_start',
                'HL_end',
                'HL_text_id'])
