import inspect
import re
import sys
import unicodedata
import yaml
from django.contrib.contenttypes.models import ContentType

from reversion import revisions as reversion
from django.apps import apps
import reversion
from django.conf import settings
from django.contrib.auth.models import Group
from django.db import models
from django.db.models import Q
from django.db.models.signals import m2m_changed, post_save
from django.dispatch import receiver
from django.urls import reverse
from guardian.shortcuts import assign_perm, remove_perm
from model_utils.managers import InheritanceManager
from django.db.models.query import QuerySet
from apis_core.helper_functions import DateParser
from apis_core.apis_metainfo.models import RootObject, Collection


# __before_rdf_refactoring__
# from apis_core.apis_vocabularies.models import (
#     EventType,
#     InstitutionType,
#     PlaceType,
#     ProfessionType,
#     Title,
#     WorkType,
# )


BASE_URI = getattr(settings, "APIS_BASE_URI", "http://apis.info/")
NEXT_PREV = getattr(settings, "APIS_NEXT_PREV", True)


# __before_rdf_refactoring__
# class AbstractEntity(TempEntityClass):
# __after_rdf_refactoring__
class AbstractEntity(RootObject):

    """
    Abstract super class which encapsulates common logic between the different entity kinds and provides various methods
    relating to either all or a specific entity kind.

    Most of the class methods are designed to be used in the sublcass as they are considering contexts which depend on
    the subclass entity type. So they are to be understood in that dynamic context.
    """

    entity_settings = {
        "list_filters": ["name", "related_entity_name", "related_property_name"],
        "search": ["name"],
    }

    class Meta:
        abstract = True

    def __init__(self, *args, **kwargs):

        super().__init__(*args, **kwargs)
        self.__class__.create_relation_methods_from_manytomany_fields()

    # Methods dealing with individual data retrievals of instances
    ####################################################################################################################

    def __str__(self):

        if self.name != "":
            return self.name
        else:
            return "no name provided"

    @classmethod
    def get_or_create_uri(cls, uri):
        uri = str(uri)
        try:
            if re.match(r"^[0-9]*$", uri):
                p = cls.objects.get(pk=uri)
            else:
                p = cls.objects.get(uri__uri=uri)
            return p
        except:
            print("Found no object corresponding to given uri.")
            return False

    @classmethod
    def get_entity_list_filter(cls):

        return None


    # Various Methods enabling convenient shortcuts between entities, relations, fields, etc
    ####################################################################################################################

    @classmethod
    def create_relation_methods_from_manytomany_fields(cls):
        """
        Creates methods on an entity class with which other related entities can be called without the need to consider
        potential self-references (the A and B sides therein).

        The resulting methods follow the syntax:
        <entity>.get_related_<entity>_instances()

        e.g. for Person:
        person.get_related_work_instances()
        or
        person.get_related_person_instances()

        Note that with these methods it is not necessary to differentiate between A and B entities when self-relations exist.

        The result of any such method call is the queryset of the related entities.
        (And not a ManyToManyManager as is the case when calling <entity>.<entity>_set where in the case of self-relation
        it must be differentiated between A and B entities, e.g. person.personA_set )

        It was not possible to my understanding to change managers in such a way that two (the A and the B) could be combined
        into one manager. Hence these additional shortcut methods.

        :return: None
        """

        def create_function_from_manytomany_field_to_other_entity(
            entity_manytomany_field,
        ):
            """
            creates the individual method from a ManyToMany field by calling the manager's objects.all()

            This method creation has to be done here in a separate method, so that it can be called once before assignment
            as otherwise the variable 'entity_name' in the loop below changes with each iteration and with that also the
            method references (due to python's "late binding").
            A method call in between thus forces the content of 'entity_name' to be assigned for good to the
            respective class ( = forced early binding).
            For more details on this: https://stackoverflow.com/questions/3431676/creating-functions-in-a-loop

            :param entity_manytomany_field: the ManyToManyManager to another model
            :return: method which will call the managers's objects.all() method
            """
            return lambda self: getattr(self, entity_manytomany_field).all().distinct()

        def create_function_from_manytomany_field_to_self_entity(
            entityA_manytomany_field, entityB_manytomany_field
        ):
            """
            Same method as above, but with two managers instead of one for the case of self-relations.

            Both managers' objects.all() methods are called and their queryset results are unionised for the
            shortcut method of an entity to its own related entities.

            :param entityA_manytomany_field: ManyToManyManager to entity A in a self-relation
            :param entityB_manytomany_field: ManyToManyManager to entity A in a self-relation
            :return: method to call both and return the distinct union of them
            """
            return lambda self: (
                getattr(self, entityA_manytomany_field)
                .all()
                .union(getattr(self, entityB_manytomany_field).all())
            ).distinct()

        for entity_name in cls.get_all_entity_names():
            # Iterate over each entity defined within this models' module

            related_entity_function_name = "get_related_" + entity_name + "_instances"

            if not hasattr(cls, related_entity_function_name):

                if cls.__name__.lower() == entity_name:
                    # If the related entity is the same as this current one, then set the names of the related functions
                    # to A and B and also combine them into one function where both A and B are returned.

                    related_entityA_function_name = (
                        "get_related_" + entity_name + "A_instances"
                    )
                    related_entityB_function_name = (
                        "get_related_" + entity_name + "B_instances"
                    )
                    entityA_manytomany_field = entity_name + "A_set"
                    entityB_manytomany_field = entity_name + "B_set"

                    setattr(
                        cls,
                        related_entityA_function_name,
                        create_function_from_manytomany_field_to_other_entity(
                            entityA_manytomany_field
                        ),
                    )

                    setattr(
                        cls,
                        related_entityB_function_name,
                        create_function_from_manytomany_field_to_other_entity(
                            entityB_manytomany_field
                        ),
                    )

                    setattr(
                        cls,
                        related_entity_function_name,
                        create_function_from_manytomany_field_to_self_entity(
                            entityA_manytomany_field, entityB_manytomany_field
                        ),
                    )

                else:
                    # If the related entity is a different one, then just build on the usual names

                    entity_manytomany_field = entity_name + "_set"

                    setattr(
                        cls,
                        related_entity_function_name,
                        create_function_from_manytomany_field_to_other_entity(
                            entity_manytomany_field
                        ),
                    )

    # Methods dealing with all entities
    ####################################################################################################################

    _all_entity_classes = None
    _all_entity_names = None

    @classmethod
    def get_all_entity_classes(cls):
        """
        Retrieve all entity classes included in an APIS Ontologies app's
        model.py file – except classes named "ent_class".

        Attempts to set protected variables
        - _all_entity_classes to list of classes
        - _all_entity_names to list of strings
        if they do not exist yet and returns _all_entity_classes.

        :return: a list of classes, or None
        """

        if cls._all_entity_classes is None:
            entity_classes = []
            entity_names = []

            from apis_ontology import models as ontology_models

            for entity_name, entity_class in inspect.getmembers(
                ontology_models, inspect.isclass
            ):

                # print(entity_name, entity_class)

                if (
                    # entity_class.__module__ == "apis_core.apis_entities.models"
                    entity_class.__module__ == "apis_ontology.models"
                    and entity_name != "ent_class"
                    and entity_name != "AbstractEntity"
                ):

                    entity_classes.append(entity_class)
                    entity_names.append(entity_name.lower())

            cls._all_entity_classes = entity_classes
            cls._all_entity_names = entity_names

        return cls._all_entity_classes

    @classmethod
    def get_entity_class_of_name(cls, entity_name):
        """
        Look up an entity class based on a given name.

        :param entity_name: a string to compare against classes' __name__
                            values; need not be formatted (letter case does
                            not matter)
        :return: an entity class – or raise exception
        """
        for entity_class in cls.get_all_entity_classes():
            if entity_class.__name__.lower() == entity_name.lower():
                return entity_class

        raise Exception("Could not find entity class of name:", entity_name)

    @classmethod
    def get_all_entity_names(cls):
        """
        Retrieve lower-cased names of all entity classes in an
        APIS Ontologies app's model.py file.

        :return: a list of strings, or None
        """
        if cls._all_entity_names is None:
            cls.get_all_entity_classes()

        return cls._all_entity_names

    # Methods dealing with related entities
    ####################################################################################################################

    _related_entity_field_names = None

    @classmethod
    def get_related_entity_field_names(cls):
        """
        :return: a list of names of all ManyToMany field names relating to entities from the respective entity class

        E.g. for Person.get_related_entity_field_names() or person_instance.get_related_entity_field_names() ->
        ['event_set', 'institution_set', 'personB_set', 'personA_set', 'place_set', 'work_set']

        Note: this method depends on the 'generate_all_fields' function of the EntityRelationFieldGenerator class 
        which wires the ManyToMany Fields into the entities and respective relationtypes. 
        This method is nevertheless defined here within AbstractEntity for documentational purpose.
        """

        if cls._related_entity_field_names is None:
            raise Exception("_related_entity_field_names was not initialized yet.")
        else:
            return cls._related_entity_field_names

    @classmethod
    def add_related_entity_field_name(cls, entity_field_name):
        """
        :param entity_field_name: the name of one of several ManyToMany fields created automatically
        :return: None

        Note: this method depends on the 'generate_all_fields' function of the EntityRelationFieldGenerator class 
        which wires the ManyToMany Fields into the entities and respective relationtypes. 
        This method is nevertheless defined here within AbstractEntity for documentational purpose.
        """

        if cls._related_entity_field_names is None:
            cls._related_entity_field_names = []

        cls._related_entity_field_names.append(entity_field_name)

    def get_related_entity_instances(self):
        """
        :return: list of queryset of all entity instances which are somehow related to the calling entity instance
        """

        queryset_list = []

        for entity_name in self.get_all_entity_names():

            queryset = getattr(self, "get_related_" + entity_name + "_instances")()
            if len(queryset) > 0:
                queryset_list.append(queryset)

        return queryset_list

    # Methods dealing with related relations
    ####################################################################################################################

    @classmethod
    def get_related_relation_classes(cls):
        """
        :return: list of python classes of the relations which are related to the respective entity class

        E.g. for Place.get_related_relation_classes() or place_instance.get_related_relation_classes() ->
        [ InstitutionPlace, PersonPlace, PlaceEvent, PlacePlace, PlaceWork ]
        """

        # TODO __sresch__ : check for best practice on local imports vs circularity problems.
        from apis_core.apis_relations.models import AbstractRelation

        return AbstractRelation.get_relation_classes_of_entity_class(cls)

    @classmethod
    def get_related_relation_field_names(cls):
        """
        :return: list of class names in lower case of the relations which are related to the respective entity class

        E.g. for Place.get_related_relation_names() or place_instance.get_related_relation_names() ->
        ['institutionplace_set', 'personplace_set', 'placeevent_set', 'placeplace_set', 'placework_set']
        """
        # TODO __sresch__ : check for best practice on local imports vs circularity problems.
        from apis_core.apis_relations.models import AbstractRelation

        return AbstractRelation.get_relation_field_names_of_entity_class(cls)

    def get_related_relation_instances(self):
        """
        :return: list of queryset of all relation instances which are somehow related to the calling entity instance
        """

        queryset_list = []

        for relation_class in self.get_related_relation_classes():

            q_args = Q()

            if relation_class.get_related_entity_classA() == self.__class__:
                q_args |= Q(**{relation_class.get_related_entity_field_nameA(): self})

            if relation_class.get_related_entity_classB() == self.__class__:
                q_args |= Q(**{relation_class.get_related_entity_field_nameB(): self})

            queryset = relation_class.objects.filter(q_args)
            queryset_list.extend(list(queryset))

        return queryset_list

    # Methods dealing with related relationtypes
    ####################################################################################################################

    _related_relationtype_classes = None
    _related_relationtype_field_names = None
    _related_relationtype_names = None

    @classmethod
    def get_related_relationtype_classes(cls):
        """
        :return: list of python classes of the relation types which are related to the respective entity class

        E.g. for Place.get_related_relation_classes() or place_instance.get_related_relation_classes() ->
        [ InstitutionPlaceRelation, PersonPlaceRelation, PlaceEventRelation, PlacePlaceRelation, PlaceWorkRelation ]
        """

        if cls._related_relationtype_classes is None:

            relationtype_classes = []
            relationtype_names = []

            # TODO __sresch__ : check for best practice on local imports vs circularity problems.
            from apis_core.apis_vocabularies.models import AbstractRelationType

            for (
                relationtype_class
            ) in AbstractRelationType.get_all_relationtype_classes():

                relationtype_name = relationtype_class.__name__.lower()

                if cls.__name__.lower() in relationtype_name:

                    relationtype_classes.append(relationtype_class)
                    relationtype_names.append(relationtype_name)

            cls._related_relationtype_classes = relationtype_classes
            cls._related_relationtype_names = relationtype_names

        return cls._related_relationtype_classes

    @classmethod
    def get_related_relationtype_names(cls):
        """
        :return: list of class names in lower case of the relation types which are related to the respective entity class

        E.g. for Place.get_related_relation_classes() or place_instance.get_related_relation_classes() ->
        [ 'institutionplacerelation', 'personplacerelation', 'placeeventrelation', 'placeplacerelation', 'placeworkrelation' ]
        """

        if cls._related_relationtype_names is None:

            cls.get_related_relationtype_classes()

        return cls._related_relationtype_names

    @classmethod
    def get_related_relationtype_field_names(cls):
        """
        :return: a list of names of all ManyToMany field names relating to relationtypes from the respective entity class

        E.g. for PersonPerson.get_related_relationtype_field_names() or person_instance.get_related_relationtype_field_names() ->
        ['event_relationtype_set', 'institution_relationtype_set', 'personB_relationtype_set', 'personA_relationtype_set', 'place_relationtype_set', 'work_relationtype_set']

        Note: this method depends on the 'generate_all_fields' function of the EntityRelationFieldGenerator class 
        which wires the ManyToMany Fields into the entities and respective relationtypes. 
        This method is nevertheless defined here within AbstractEntity for documentational purpose.
        """

        if cls._related_relationtype_field_names is None:
            raise Exception(
                "_related_relationtype_field_names was not initialized yet."
            )
        else:
            return cls._related_relationtype_field_names

    @classmethod
    def add_related_relationtype_field_name(cls, relationtype_field_name):
        """
        :param entity_field_name: the name of one of several ManyToMany fields created automatically
        :return: None

        Note: this method depends on the 'generate_all_fields' function of the EntityRelationFieldGenerator class 
        which wires the ManyToMany Fields into the entities and respective relationtypes. 
        This method is nevertheless defined here within AbstractEntity for documentational purpose.
        """

        if cls._related_relationtype_field_names is None:
            cls._related_relationtype_field_names = []

        cls._related_relationtype_field_names.append(relationtype_field_name)

    def get_related_relationtype_instances(self):
        """
        :return: list of queryset of all relationtype instances which are somehow related to the calling entity instance
        """

        queryset_list = []

        for entity_name in self.get_all_entity_names():
            queryset = None

            if entity_name != self.__class__.__name__.lower():

                queryset = (
                    getattr(self, entity_name + "_relationtype_set").all().distinct()
                )

            else:

                querysetA = (
                    getattr(self, entity_name + "A_relationtype_set").all().distinct()
                )
                querysetB = (
                    getattr(self, entity_name + "B_relationtype_set").all().distinct()
                )
                queryset = querysetA.union(querysetB)

            if queryset and len(queryset) > 0:
                queryset_list.append(queryset)

        return queryset_list


# __after_rdf_refactoring__
# TODO RDF: Consider moving TempEntityClass also into ontologies
@reversion.register()
class TempEntityClass(AbstractEntity):
    """ Base class to bind common attributes to many classes.

    The common attributes are:
    written start and enddates
    recognized start and enddates which are derived by RegEx
    from the written dates.
    A review boolean field to mark an object as reviewed
    """

    review = models.BooleanField(
        default=False,
        help_text="Should be set to True, if the data record holds up quality standards.",
    )
    start_date = models.DateField(blank=True, null=True)
    start_start_date = models.DateField(blank=True, null=True)
    start_end_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    end_start_date = models.DateField(blank=True, null=True)
    end_end_date = models.DateField(blank=True, null=True)
    start_date_written = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="Start",
    )
    end_date_written = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="End",
    )
    # TODO RDF : Make Text also a Subclass of RootObject
    text = models.ManyToManyField("apis_metainfo.Text", blank=True)
    collection = models.ManyToManyField("apis_metainfo.Collection")
    status = models.CharField(max_length=100)
    source = models.ForeignKey(
        "apis_metainfo.Source", blank=True, null=True, on_delete=models.SET_NULL
    )
    references = models.TextField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    published = models.BooleanField(default=False)
    objects = models.Manager()
    objects_inheritance = InheritanceManager()


    def __str__(self):
        if self.name != "" and hasattr(
            self, "first_name" # TODO RDF: remove first_name here
        ):  # relation usually don´t have names
            return "{}, {} (ID: {})".format(self.name, self.first_name, self.id)
        elif self.name != "":
            return "{} (ID: {})".format(self.name, self.id)
        else:
            return "(ID: {})".format(self.id)

    def save(self, parse_dates=True, *args, **kwargs):
        """Adaption of the save() method of the class to automatically parse string-dates into date objects
        """

        if parse_dates:

            # overwrite every field with None as default
            start_date = None
            start_start_date = None
            start_end_date = None
            end_date = None
            end_start_date = None
            end_end_date = None

            if self.start_date_written:
                # If some textual user input of a start date is there, then parse it

                start_date, start_start_date, start_end_date = \
                    DateParser.parse_date(self.start_date_written)

            if self.end_date_written:
                # If some textual user input of an end date is there, then parse it

                end_date, end_start_date, end_end_date = \
                    DateParser.parse_date(self.end_date_written)

            self.start_date = start_date
            self.start_start_date = start_start_date
            self.start_end_date = start_end_date
            self.end_date = end_date
            self.end_start_date = end_start_date
            self.end_end_date = end_end_date

        if self.name:
            self.name = unicodedata.normalize("NFC", self.name)

        super(TempEntityClass, self).save(*args, **kwargs)

        return self

    # TODO RDF: I don't remember what this function was used for. Investiage or delete it 
    def get_child_entity(self):
        for x in [x for x in apps.all_models['apis_entities'].values()]:
            if x.__name__ in list(settings.APIS_ENTITIES.keys()):
                try:
                    my_ent = x.objects.get(id=self.id)
                    return my_ent
                    break
                except ObjectDoesNotExist:
                    pass
        return None

    @classmethod
    def get_listview_url(self):
        entity = self.__name__.lower()
        # __before_rdf_refactoring__
        #
        # if entity == "institution" or len(entity) < 10:
        #     return reverse(
        #         "apis_core:apis_entities:generic_entities_list",
        #         kwargs={"entity": entity},
        #     )
        # else:
        #     return reverse(
        #         "apis_core:apis_relations:generic_relations_list",
        #         kwargs={"entity": entity},
        #     )
        # __after_rdf_refactoring__
        return reverse(
            "apis_core:apis_entities:generic_entities_list",
            kwargs={"entity": entity},
        )

    @classmethod
    def get_createview_url(self):
        entity = self.__name__.lower()
        # __before_rdf_refactoring__
        #
        # if entity == "institution" or len(entity) < 10:
        #     return reverse(
        #         "apis_core:apis_entities:generic_entities_create_view",
        #         kwargs={"entity": entity},
        #     )
        # else:
        #     return None
        # __after_rdf_refactoring__
        return reverse(
            "apis_core:apis_entities:generic_entities_create_view",
            kwargs={"entity": entity},
        )

    def get_edit_url(self):
        entity = self.__class__.__name__.lower()
        # __before_rdf_refactoring__
        #
        # if entity == "institution" or len(entity) < 10:
        #     return reverse(
        #         "apis_core:apis_entities:generic_entities_edit_view",
        #         kwargs={"entity": entity, "pk": self.id},
        #     )
        # else:
        #     return None
        # __after_rdf_refactoring__
        return reverse(
            "apis_core:apis_entities:generic_entities_edit_view",
            kwargs={"entity": entity, "pk": self.id},
        )

    def get_child_class(self):
        child = self.get_child_entity()
        if child:
            return "{}".format(child.__class__.__name__)
        else:
            return "{}".format(child.__class__.__name__)

    def get_absolute_url(self):
        entity = self.__class__.__name__.lower()
        # __before_rdf_refactoring__
        #
        # if entity == "institution" or len(entity) < 10:
        #     return reverse(
        #         "apis_core:apis_entities:generic_entities_detail_view",
        #         kwargs={"entity": entity, "pk": self.id},
        #     )
        # elif entity == "tempentityclass":
        #     return self.get_child_entity().get_absolute_url()
        # else:
        #     return reverse(
        #         "apis_core:apis_relations:generic_relations_detail_view",
        #         kwargs={"entity": entity, "pk": self.id},
        #     )
        # __after_rdf_refactoring__
        return reverse(
            "apis_core:apis_entities:generic_entities_detail_view",
            kwargs={"entity": entity, "pk": self.id},
        )

    def get_prev_url(self):
        entity = self.__class__.__name__.lower()
        if NEXT_PREV:
            prev = self.__class__.objects.filter(id__lt=self.id).order_by("-id")
        else:
            return False
        if prev:
            # __before_rdf_refactoring__
            #
            # if entity == "institution" or len(entity) < 10:
            #     return reverse(
            #         "apis_core:apis_entities:generic_entities_detail_view",
            #         kwargs={"entity": entity, "pk": prev.first().id},
            #     )
            # else:
            #     return reverse(
            #         "apis_core:apis_relations:generic_relations_detail_view",
            #         kwargs={"entity": entity, "pk": prev.first().id},
            #     )
            # __after_rdf_refactoring__
            return reverse(
                "apis_core:apis_entities:generic_entities_detail_view",
                kwargs={"entity": entity, "pk": prev.first().id},
            )
        else:
            return False

    def get_next_url(self):
        entity = self.__class__.__name__.lower()
        if NEXT_PREV:
            next = self.__class__.objects.filter(id__gt=self.id)
        else:
            return False
        if next:
            # __before_rdf_refactoring__
            #
            # if entity == "institution" or len(entity) < 10:
            #     return reverse(
            #         "apis_core:apis_entities:generic_entities_detail_view",
            #         kwargs={"entity": entity, "pk": next.first().id},
            #     )
            # else:
            #     return reverse(
            #         "apis_core:apis_relations:generic_relations_detail_view",
            #         kwargs={"entity": entity, "pk": next.first().id},
            #     )
            # __after_rdf_refactoring__
            return reverse(
                "apis_core:apis_entities:generic_entities_detail_view",
                kwargs={"entity": entity, "pk": next.first().id},
            )
        else:
            return False

    def get_delete_url(self):
        entity = self.__class__.__name__.lower()
        # __before_rdf_refactoring__
        #
        # if entity == "institution" or len(entity) < 10:
        #     return reverse(
        #         "apis_core:apis_entities:generic_entities_delete_view",
        #         kwargs={"entity": entity, "pk": self.id},
        #     )
        # else:
        #     return None
        # __after_rdf_refactoring__
        return reverse(
            "apis_core:apis_entities:generic_entities_delete_view",
            kwargs={"entity": entity, "pk": self.id},
        )

    def merge_with(self, entities):

        # TODO: Check if these imports can be put to top of module while not having a circual import issue
        from apis_core.apis_labels.models import Label
        from apis_core.apis_vocabularies.models import LabelType
        from apis_core.apis_metainfo.models import Uri

        e_a = type(self).__name__
        self_model_class = ContentType.objects.get(
            app_label="apis_entities", model__iexact=e_a
        ).model_class()
        if isinstance(entities, int):
            entities = self_model_class.objects.get(pk=entities)
        if not isinstance(entities, list) and not isinstance(entities, QuerySet):
            entities = [entities]
            entities = [
                self_model_class.objects.get(pk=ent) if type(ent) == int else ent
                for ent in entities
            ]
        rels = ContentType.objects.filter(
            app_label="apis_relations", model__icontains=e_a
        )
        for ent in entities:
            e_b = type(ent).__name__
            if e_a != e_b:
                continue
            lt, created = LabelType.objects.get_or_create(name="Legacy name (merge)")
            col_list = list(self.collection.all())
            for col2 in ent.collection.all():
                if col2 not in col_list:
                    self.collection.add(col2)
            for f in ent._meta.local_many_to_many:
                if not f.name.endswith('_set'):
                    sl = list(getattr(self, f.name).all())
                    for s in getattr(ent, f.name).all():
                        if s not in sl:
                            getattr(self, f.name).add(s)
            Label.objects.create(label=str(ent), label_type=lt, temp_entity=self)
            for u in Uri.objects.filter(root_object=ent):
                u.entity = self
                u.save()
            for l in Label.objects.filter(temp_entity=ent):
                l.temp_entity = self
                l.save()
            for r in rels.filter(model__icontains=e_b):
                lst_ents_rel = str(r).split()
                if lst_ents_rel[0] == lst_ents_rel[1]:
                    q_d = {"related_{}A".format(e_b.lower()): ent}
                    k = r.model_class().objects.filter(**q_d)
                    for t in k:
                        setattr(t, "related_{}A".format(e_a.lower()), self)
                        t.save()
                    q_d = {"related_{}B".format(e_b.lower()): ent}
                    k = r.model_class().objects.filter(**q_d)
                    for t in k:
                        setattr(t, "related_{}B".format(e_a.lower()), self)
                        t.save()
                else:
                    q_d = {"related_{}".format(e_b.lower()): ent}
                    k = r.model_class().objects.filter(**q_d)
                    for t in k:
                        setattr(t, "related_{}".format(e_a.lower()), self)
                        t.save()
            ent.delete()

    def get_serialization(self):
        from apis_core.apis_entities.serializers_generic import EntitySerializer
        return EntitySerializer(self).data


def prepare_fields_dict(fields_list, vocabs, vocabs_m2m):
    res = dict()
    for f in fields_list:
        res[f["name"]] = getattr(models, f["field_type"])(**f["attributes"])
    for v in vocabs:
        res[v] = models.ForeignKey(
            f"apis_vocabularies.{v}", blank=True, null=True, on_delete=models.SET_NULL
        )
    for v2 in vocabs_m2m:
        res[v2] = models.ManyToManyField(f"apis_vocabularies.{v2}", blank=True)
    return res


# ents_cls_list = []
# if a_ents:
#     with open(a_ents, "r") as ents_file:
#         ents = yaml.load(ents_file, Loader=yaml.CLoader)
#         print(ents)
#         for ent in ents["entities"]:
#             attributes = prepare_fields_dict(
#                 ent["fields"], ent.get("vocabs", []), ent.get("vocabs_m2m", [])
#             )
#             attributes["__module__"] = __name__
#             ent_class = type(ent["name"], (AbstractEntity,), attributes)
#             globals()[ent["name"]] = ent_class
#             ents_cls_list.append(ent_class)
#             reversion.register(ent_class, follow=["tempentityclass_ptr"])


@receiver(post_save, dispatch_uid="create_default_uri")
def create_default_uri(sender, instance, **kwargs):

    from apis_core.apis_metainfo.models import Uri

    if kwargs["created"] and sender in AbstractEntity.get_all_entity_classes():
        if BASE_URI.endswith("/"):
            base1 = BASE_URI[:-1]
        else:
            base1 = BASE_URI
        uri_c = "{}{}".format(
            base1, reverse("GetEntityGenericRoot", kwargs={"pk": instance.pk}),
        )
        uri2 = Uri(uri=uri_c, domain="apis default", root_object=instance)
        uri2.save()


lst_entities_complete = [
    globals()[x]
    for x in globals()
    if isinstance(globals()[x], models.base.ModelBase)
    and globals()[x].__module__ == "apis_core.apis_entities.models"
    and x != "AbstractEntity"
    and globals()[x]
]
lst_entities_complete = list(dict.fromkeys(lst_entities_complete))
perm_change_senders = [
    getattr(getattr(x, "collection"), "through") for x in lst_entities_complete
] # TODO: Inspect. This list here will contain only duplicates if `lst_entities_complete` contains all entities


@receiver(
    m2m_changed, dispatch_uid="create_object_permissions",
)
def create_object_permissions(sender, instance, **kwargs):
    if kwargs["action"] == "pre_add" and sender in perm_change_senders:
        perms = []
        for j in kwargs["model"].objects.filter(pk__in=kwargs["pk_set"]):
            perms.extend(j.groups_allowed.all())
        for x in perms:
            assign_perm("change_" + instance.__class__.__name__.lower(), x, instance)
            assign_perm("delete_" + instance.__class__.__name__.lower(), x, instance)
    elif kwargs["action"] == "post_remove" and sender in perm_change_senders:
        perms = []
        perms_keep = []
        for j in kwargs["model"].objects.filter(pk__in=kwargs["pk_set"]):
            perms.extend(j.groups_allowed.all())
        for u in instance.collection.all():
            perms_keep.extend(u.groups_allowed.all())
        rm_perms = set(perms) - set(perms_keep)
        for x in rm_perms:
            remove_perm("change_" + instance.__class__.__name__.lower(), x, instance)
            remove_perm("delete_" + instance.__class__.__name__.lower(), x, instance)


@receiver(
    m2m_changed,
    sender=Collection.groups_allowed.through,
    dispatch_uid="add_usergroup_collection",
)
def add_usergroup_collection(sender, instance, **kwargs):
    if kwargs["action"] == "pre_add":
        for x in kwargs["model"].objects.filter(pk__in=kwargs["pk_set"]):
            for z in ["change", "delete"]:
                for y in [Person, Institution, Place, Event, Work]:
                    assign_perm(
                        z + "_" + y.__name__.lower(),
                        x,
                        y.objects.filter(collection=instance),
                    )


if "registration" in getattr(settings, "INSTALLED_APPS", []):
    from registration.backends.simple.views import RegistrationView
    from registration.signals import user_registered

    @receiver(
        user_registered,
        sender=RegistrationView,
        dispatch_uid="add_registered_user_to_group",
    )
    def add_user_to_group(sender, user, request, **kwargs):
        user_group = getattr(settings, "APIS_AUTO_USERGROUP", None)
        if user_group is not None:
            user.groups.add(Group.objects.get(name=user_group))

# __after_rdf_refactoring__
# TODO RDF : This function is an ad hoc work around. It would be better done if entity settings would be fully moved into the entities themselves
def fill_settings_with_entity_attributes():

    for entity_class in AbstractEntity.get_all_entity_classes():

        entity_settings = entity_class.entity_settings

        settings.APIS_ENTITIES[entity_class.__name__] = entity_settings

fill_settings_with_entity_attributes()
