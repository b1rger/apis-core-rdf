Search.setIndex({docnames:["configuration","data_model","index","installation","internal_api","modules/entities","modules/helper_functions","modules/metainfo","modules/relations","modules/vocabularies","user_documentation"],envversion:{"sphinx.domains.c":2,"sphinx.domains.changeset":1,"sphinx.domains.citation":1,"sphinx.domains.cpp":4,"sphinx.domains.index":1,"sphinx.domains.javascript":2,"sphinx.domains.math":2,"sphinx.domains.python":3,"sphinx.domains.rst":2,"sphinx.domains.std":2,"sphinx.ext.todo":2,"sphinx.ext.viewcode":1,sphinx:56},filenames:["configuration.rst","data_model.rst","index.rst","installation.rst","internal_api.rst","modules/entities.rst","modules/helper_functions.rst","modules/metainfo.rst","modules/relations.rst","modules/vocabularies.rst","user_documentation.rst"],objects:{"apis_core.apis_entities":[[5,0,0,"-","models"],[5,0,0,"-","views"]],"apis_core.apis_entities.models":[[5,1,1,"","AbstractEntity"],[5,1,1,"","Event"],[5,1,1,"","Institution"],[5,1,1,"","Person"],[5,1,1,"","Place"],[5,1,1,"","Work"]],"apis_core.apis_entities.models.AbstractEntity":[[5,2,1,"","add_related_entity_field_name"],[5,2,1,"","add_related_relationtype_field_name"],[5,2,1,"","create_relation_methods_from_manytomany_fields"],[5,2,1,"","get_all_entity_classes"],[5,2,1,"","get_all_entity_names"],[5,2,1,"","get_entity_class_of_name"],[5,2,1,"","get_related_entity_field_names"],[5,2,1,"","get_related_entity_instances"],[5,2,1,"","get_related_relation_classes"],[5,2,1,"","get_related_relation_field_names"],[5,2,1,"","get_related_relation_instances"],[5,2,1,"","get_related_relationtype_classes"],[5,2,1,"","get_related_relationtype_field_names"],[5,2,1,"","get_related_relationtype_instances"],[5,2,1,"","get_related_relationtype_names"]],"apis_core.apis_entities.models.Event":[[5,3,1,"","DoesNotExist"],[5,3,1,"","MultipleObjectsReturned"]],"apis_core.apis_entities.models.Institution":[[5,3,1,"","DoesNotExist"],[5,3,1,"","MultipleObjectsReturned"]],"apis_core.apis_entities.models.Person":[[5,3,1,"","DoesNotExist"],[5,3,1,"","MultipleObjectsReturned"],[5,2,1,"","save"]],"apis_core.apis_entities.models.Place":[[5,3,1,"","DoesNotExist"],[5,3,1,"","MultipleObjectsReturned"],[5,2,1,"","save"]],"apis_core.apis_entities.models.Work":[[5,3,1,"","DoesNotExist"],[5,3,1,"","MultipleObjectsReturned"]],"apis_core.apis_entities.views":[[5,1,1,"","GenericListViewNew"],[5,5,1,"","getGeoJson"],[5,5,1,"","getGeoJsonList"],[5,5,1,"","getNetJsonList"],[5,5,1,"","getNetJsonListInstitution"],[5,5,1,"","resolve_ambigue_place"]],"apis_core.apis_entities.views.GenericListViewNew":[[5,4,1,"","formhelper_class"],[5,2,1,"","get_context_data"],[5,2,1,"","get_queryset"],[5,2,1,"","get_table"],[5,2,1,"","render_to_response"]],"apis_core.apis_metainfo":[[7,0,0,"-","models"]],"apis_core.apis_metainfo.models":[[7,1,1,"","Collection"],[7,1,1,"","Source"],[7,1,1,"","TempEntityClass"],[7,1,1,"","Text"],[7,1,1,"","Uri"],[7,1,1,"","UriCandidate"]],"apis_core.apis_metainfo.models.Collection":[[7,3,1,"","DoesNotExist"],[7,3,1,"","MultipleObjectsReturned"],[7,2,1,"","save"]],"apis_core.apis_metainfo.models.Source":[[7,3,1,"","DoesNotExist"],[7,3,1,"","MultipleObjectsReturned"]],"apis_core.apis_metainfo.models.TempEntityClass":[[7,3,1,"","DoesNotExist"],[7,3,1,"","MultipleObjectsReturned"],[7,2,1,"","save"]],"apis_core.apis_metainfo.models.Text":[[7,3,1,"","DoesNotExist"],[7,3,1,"","MultipleObjectsReturned"],[7,2,1,"","save"]],"apis_core.apis_metainfo.models.Uri":[[7,3,1,"","DoesNotExist"],[7,3,1,"","MultipleObjectsReturned"]],"apis_core.apis_metainfo.models.UriCandidate":[[7,3,1,"","DoesNotExist"],[7,3,1,"","MultipleObjectsReturned"]],"apis_core.apis_relations":[[8,0,0,"-","models"],[8,0,0,"-","views"]],"apis_core.apis_relations.models":[[8,1,1,"","AbstractRelation"],[8,1,1,"","EventEvent"],[8,1,1,"","EventWork"],[8,1,1,"","InstitutionEvent"],[8,1,1,"","InstitutionInstitution"],[8,1,1,"","InstitutionPlace"],[8,1,1,"","InstitutionWork"],[8,1,1,"","PersonEvent"],[8,1,1,"","PersonInstitution"],[8,1,1,"","PersonPerson"],[8,1,1,"","PersonPlace"],[8,1,1,"","PersonWork"],[8,1,1,"","PlaceEvent"],[8,1,1,"","PlacePlace"],[8,1,1,"","PlaceWork"],[8,1,1,"","RelationPublishedQueryset"],[8,1,1,"","WorkWork"]],"apis_core.apis_relations.models.AbstractRelation":[[8,2,1,"","add_relation_class_of_entity_class"],[8,2,1,"","add_relation_field_name_of_entity_class"],[8,2,1,"","get_all_relation_classes"],[8,2,1,"","get_all_relation_names"],[8,2,1,"","get_related_entity_classA"],[8,2,1,"","get_related_entity_classB"],[8,2,1,"","get_related_entity_field_nameA"],[8,2,1,"","get_related_entity_field_nameB"],[8,2,1,"","get_related_entity_instanceA"],[8,2,1,"","get_related_entity_instanceB"],[8,2,1,"","get_relation_class_of_name"],[8,2,1,"","get_relation_classes_of_entity_class"],[8,2,1,"","get_relation_classes_of_entity_name"],[8,2,1,"","get_relation_field_names_of_entity_class"],[8,2,1,"","get_table_dict"]],"apis_core.apis_relations.models.EventEvent":[[8,3,1,"","DoesNotExist"],[8,3,1,"","MultipleObjectsReturned"],[8,2,1,"","get_related_entity_classA"],[8,2,1,"","get_related_entity_classB"],[8,2,1,"","get_related_entity_field_nameA"],[8,2,1,"","get_related_entity_field_nameB"]],"apis_core.apis_relations.models.EventWork":[[8,3,1,"","DoesNotExist"],[8,3,1,"","MultipleObjectsReturned"],[8,2,1,"","get_related_entity_classA"],[8,2,1,"","get_related_entity_classB"],[8,2,1,"","get_related_entity_field_nameA"],[8,2,1,"","get_related_entity_field_nameB"]],"apis_core.apis_relations.models.InstitutionEvent":[[8,3,1,"","DoesNotExist"],[8,3,1,"","MultipleObjectsReturned"],[8,2,1,"","get_related_entity_classA"],[8,2,1,"","get_related_entity_classB"],[8,2,1,"","get_related_entity_field_nameA"],[8,2,1,"","get_related_entity_field_nameB"]],"apis_core.apis_relations.models.InstitutionInstitution":[[8,3,1,"","DoesNotExist"],[8,3,1,"","MultipleObjectsReturned"],[8,2,1,"","get_related_entity_classA"],[8,2,1,"","get_related_entity_classB"],[8,2,1,"","get_related_entity_field_nameA"],[8,2,1,"","get_related_entity_field_nameB"]],"apis_core.apis_relations.models.InstitutionPlace":[[8,3,1,"","DoesNotExist"],[8,3,1,"","MultipleObjectsReturned"],[8,2,1,"","get_related_entity_classA"],[8,2,1,"","get_related_entity_classB"],[8,2,1,"","get_related_entity_field_nameA"],[8,2,1,"","get_related_entity_field_nameB"]],"apis_core.apis_relations.models.InstitutionWork":[[8,3,1,"","DoesNotExist"],[8,3,1,"","MultipleObjectsReturned"],[8,2,1,"","get_related_entity_classA"],[8,2,1,"","get_related_entity_classB"],[8,2,1,"","get_related_entity_field_nameA"],[8,2,1,"","get_related_entity_field_nameB"]],"apis_core.apis_relations.models.PersonEvent":[[8,3,1,"","DoesNotExist"],[8,3,1,"","MultipleObjectsReturned"],[8,2,1,"","get_related_entity_classA"],[8,2,1,"","get_related_entity_classB"],[8,2,1,"","get_related_entity_field_nameA"],[8,2,1,"","get_related_entity_field_nameB"]],"apis_core.apis_relations.models.PersonInstitution":[[8,3,1,"","DoesNotExist"],[8,3,1,"","MultipleObjectsReturned"],[8,2,1,"","get_related_entity_classA"],[8,2,1,"","get_related_entity_classB"],[8,2,1,"","get_related_entity_field_nameA"],[8,2,1,"","get_related_entity_field_nameB"]],"apis_core.apis_relations.models.PersonPerson":[[8,3,1,"","DoesNotExist"],[8,3,1,"","MultipleObjectsReturned"],[8,2,1,"","get_related_entity_classA"],[8,2,1,"","get_related_entity_classB"],[8,2,1,"","get_related_entity_field_nameA"],[8,2,1,"","get_related_entity_field_nameB"]],"apis_core.apis_relations.models.PersonPlace":[[8,3,1,"","DoesNotExist"],[8,3,1,"","MultipleObjectsReturned"],[8,2,1,"","get_related_entity_classA"],[8,2,1,"","get_related_entity_classB"],[8,2,1,"","get_related_entity_field_nameA"],[8,2,1,"","get_related_entity_field_nameB"]],"apis_core.apis_relations.models.PersonWork":[[8,3,1,"","DoesNotExist"],[8,3,1,"","MultipleObjectsReturned"],[8,2,1,"","get_related_entity_classA"],[8,2,1,"","get_related_entity_classB"],[8,2,1,"","get_related_entity_field_nameA"],[8,2,1,"","get_related_entity_field_nameB"]],"apis_core.apis_relations.models.PlaceEvent":[[8,3,1,"","DoesNotExist"],[8,3,1,"","MultipleObjectsReturned"],[8,2,1,"","get_related_entity_classA"],[8,2,1,"","get_related_entity_classB"],[8,2,1,"","get_related_entity_field_nameA"],[8,2,1,"","get_related_entity_field_nameB"]],"apis_core.apis_relations.models.PlacePlace":[[8,3,1,"","DoesNotExist"],[8,3,1,"","MultipleObjectsReturned"],[8,2,1,"","get_related_entity_classA"],[8,2,1,"","get_related_entity_classB"],[8,2,1,"","get_related_entity_field_nameA"],[8,2,1,"","get_related_entity_field_nameB"]],"apis_core.apis_relations.models.PlaceWork":[[8,3,1,"","DoesNotExist"],[8,3,1,"","MultipleObjectsReturned"],[8,2,1,"","get_related_entity_classA"],[8,2,1,"","get_related_entity_classB"],[8,2,1,"","get_related_entity_field_nameA"],[8,2,1,"","get_related_entity_field_nameB"]],"apis_core.apis_relations.models.RelationPublishedQueryset":[[8,2,1,"","filter_ann_proj"]],"apis_core.apis_relations.models.WorkWork":[[8,3,1,"","DoesNotExist"],[8,3,1,"","MultipleObjectsReturned"],[8,2,1,"","get_related_entity_classA"],[8,2,1,"","get_related_entity_classB"],[8,2,1,"","get_related_entity_field_nameA"],[8,2,1,"","get_related_entity_field_nameB"]],"apis_core.apis_relations.views":[[8,5,1,"","get_form_ajax"],[8,5,1,"","save_ajax_form"],[8,5,1,"","turn_form_modules_into_dict"]],"apis_core.apis_vocabularies":[[9,0,0,"-","models"]],"apis_core.apis_vocabularies.models":[[9,1,1,"","AbstractRelationType"],[9,1,1,"","CollectionType"],[9,1,1,"","EventEventRelation"],[9,1,1,"","EventType"],[9,1,1,"","EventWorkRelation"],[9,1,1,"","InstitutionEventRelation"],[9,1,1,"","InstitutionInstitutionRelation"],[9,1,1,"","InstitutionPlaceRelation"],[9,1,1,"","InstitutionType"],[9,1,1,"","InstitutionWorkRelation"],[9,1,1,"","LabelType"],[9,1,1,"","PersonEventRelation"],[9,1,1,"","PersonInstitutionRelation"],[9,1,1,"","PersonPersonRelation"],[9,1,1,"","PersonPlaceRelation"],[9,1,1,"","PersonWorkRelation"],[9,1,1,"","PlaceEventRelation"],[9,1,1,"","PlacePlaceRelation"],[9,1,1,"","PlaceType"],[9,1,1,"","PlaceWorkRelation"],[9,1,1,"","ProfessionType"],[9,1,1,"","RelationBaseClass"],[9,1,1,"","TextType"],[9,1,1,"","Title"],[9,1,1,"","VocabNames"],[9,1,1,"","VocabsBaseClass"],[9,1,1,"","VocabsUri"],[9,1,1,"","WorkType"],[9,1,1,"","WorkWorkRelation"]],"apis_core.apis_vocabularies.models.AbstractRelationType":[[9,2,1,"","add_related_entity_field_name"],[9,2,1,"","get_all_relationtype_classes"],[9,2,1,"","get_all_relationtype_names"],[9,2,1,"","get_related_entity_field_names"],[9,2,1,"","get_relationtype_class_of_name"]],"apis_core.apis_vocabularies.models.CollectionType":[[9,3,1,"","DoesNotExist"],[9,3,1,"","MultipleObjectsReturned"]],"apis_core.apis_vocabularies.models.EventEventRelation":[[9,3,1,"","DoesNotExist"],[9,3,1,"","MultipleObjectsReturned"]],"apis_core.apis_vocabularies.models.EventType":[[9,3,1,"","DoesNotExist"],[9,3,1,"","MultipleObjectsReturned"]],"apis_core.apis_vocabularies.models.EventWorkRelation":[[9,3,1,"","DoesNotExist"],[9,3,1,"","MultipleObjectsReturned"]],"apis_core.apis_vocabularies.models.InstitutionEventRelation":[[9,3,1,"","DoesNotExist"],[9,3,1,"","MultipleObjectsReturned"]],"apis_core.apis_vocabularies.models.InstitutionInstitutionRelation":[[9,3,1,"","DoesNotExist"],[9,3,1,"","MultipleObjectsReturned"]],"apis_core.apis_vocabularies.models.InstitutionPlaceRelation":[[9,3,1,"","DoesNotExist"],[9,3,1,"","MultipleObjectsReturned"]],"apis_core.apis_vocabularies.models.InstitutionType":[[9,3,1,"","DoesNotExist"],[9,3,1,"","MultipleObjectsReturned"]],"apis_core.apis_vocabularies.models.InstitutionWorkRelation":[[9,3,1,"","DoesNotExist"],[9,3,1,"","MultipleObjectsReturned"]],"apis_core.apis_vocabularies.models.LabelType":[[9,3,1,"","DoesNotExist"],[9,3,1,"","MultipleObjectsReturned"]],"apis_core.apis_vocabularies.models.PersonEventRelation":[[9,3,1,"","DoesNotExist"],[9,3,1,"","MultipleObjectsReturned"]],"apis_core.apis_vocabularies.models.PersonInstitutionRelation":[[9,3,1,"","DoesNotExist"],[9,3,1,"","MultipleObjectsReturned"]],"apis_core.apis_vocabularies.models.PersonPersonRelation":[[9,3,1,"","DoesNotExist"],[9,3,1,"","MultipleObjectsReturned"]],"apis_core.apis_vocabularies.models.PersonPlaceRelation":[[9,3,1,"","DoesNotExist"],[9,3,1,"","MultipleObjectsReturned"]],"apis_core.apis_vocabularies.models.PersonWorkRelation":[[9,3,1,"","DoesNotExist"],[9,3,1,"","MultipleObjectsReturned"]],"apis_core.apis_vocabularies.models.PlaceEventRelation":[[9,3,1,"","DoesNotExist"],[9,3,1,"","MultipleObjectsReturned"]],"apis_core.apis_vocabularies.models.PlacePlaceRelation":[[9,3,1,"","DoesNotExist"],[9,3,1,"","MultipleObjectsReturned"]],"apis_core.apis_vocabularies.models.PlaceType":[[9,3,1,"","DoesNotExist"],[9,3,1,"","MultipleObjectsReturned"]],"apis_core.apis_vocabularies.models.PlaceWorkRelation":[[9,3,1,"","DoesNotExist"],[9,3,1,"","MultipleObjectsReturned"]],"apis_core.apis_vocabularies.models.ProfessionType":[[9,3,1,"","DoesNotExist"],[9,3,1,"","MultipleObjectsReturned"]],"apis_core.apis_vocabularies.models.RelationBaseClass":[[9,3,1,"","DoesNotExist"],[9,3,1,"","MultipleObjectsReturned"],[9,2,1,"","save"]],"apis_core.apis_vocabularies.models.TextType":[[9,3,1,"","DoesNotExist"],[9,3,1,"","MultipleObjectsReturned"]],"apis_core.apis_vocabularies.models.Title":[[9,3,1,"","DoesNotExist"],[9,3,1,"","MultipleObjectsReturned"]],"apis_core.apis_vocabularies.models.VocabNames":[[9,3,1,"","DoesNotExist"],[9,3,1,"","MultipleObjectsReturned"]],"apis_core.apis_vocabularies.models.VocabsBaseClass":[[9,3,1,"","DoesNotExist"],[9,3,1,"","MultipleObjectsReturned"],[9,2,1,"","save"]],"apis_core.apis_vocabularies.models.VocabsUri":[[9,3,1,"","DoesNotExist"],[9,3,1,"","MultipleObjectsReturned"]],"apis_core.apis_vocabularies.models.WorkType":[[9,3,1,"","DoesNotExist"],[9,3,1,"","MultipleObjectsReturned"]],"apis_core.apis_vocabularies.models.WorkWorkRelation":[[9,3,1,"","DoesNotExist"],[9,3,1,"","MultipleObjectsReturned"]],"apis_core.helper_functions.RDFParser":[[6,1,1,"","RDFParser"]],"apis_core.helper_functions.RDFParser.RDFParser":[[6,2,1,"","create_objct"],[6,2,1,"","get_or_create"],[6,2,1,"","merge"],[6,2,1,"","save"]]},objnames:{"0":["py","module","Python module"],"1":["py","class","Python class"],"2":["py","method","Python method"],"3":["py","exception","Python exception"],"4":["py","attribute","Python attribute"],"5":["py","function","Python function"]},objtypes:{"0":"py:module","1":"py:class","2":"py:method","3":"py:exception","4":"py:attribute","5":"py:function"},terms:{"0":[0,2],"1":[3,8],"1025":3,"11":3,"1234":2,"2":[2,3,6],"3":3,"32":3,"3306":3,"4":2,"5":[2,3,5,6],"50":0,"6":3,"60":3,"64":3,"7":3,"80":3,"8080":3,"81":3,"9":3,"\u00f6bl":[0,2],"abstract":[5,8,9],"boolean":[0,6,7],"case":[0,2,5,8,9],"class":[1,2,5,6,7,8,9],"default":[0,2,3],"do":[0,3],"export":2,"final":3,"function":[2,5,8],"import":[0,1,2,3,8,9],"int":6,"k\u00fcnstlernam":0,"long":1,"m\u00e4dchennam":0,"new":[3,10],"return":[2,5,6,8,9],"static":[2,3],"super":[5,8,9],"true":[0,2,3,6,7,8],"try":10,"universit\u00e4t":10,"var":3,"while":[2,3],A:[0,5,7,8,9],And:5,As:[1,2,10],For:[0,2,3,10],If:[0,2,3,10],In:[2,3,5,9],It:[1,2,5,9,10],One:0,Or:3,That:10,The:[0,1,2,3,5,6,7,8,9,10],Then:10,There:[1,8,10],These:[0,1],To:[0,2,3,5,10],__id:[0,2],__main__:3,__name:0,__name__:3,__note:0,__refer:0,__statu:0,__text:[0,2],_all_relation_class:8,_all_relation_nam:8,_instanc:5,_ptr:[0,2],_set:[0,5],_set__:0,abl:10,about:[7,8,9],abov:[0,2,3],abstractent:5,abstractrel:8,abstractrelationtyp:9,ac:2,academ:9,access:[0,3],acdh:2,achiev:2,activ:[0,3,10],ad:[0,2],adapt:[0,2,5,7],add:[0,2,8],add_ent:2,add_related_entity_field_nam:[5,9],add_related_relationtype_field_nam:5,add_relation_class_of_entity_class:8,add_relation_field_name_of_entity_class:8,addit:[0,2,5],addition:2,additional_col:[0,2],address:3,admin:[2,3,10],adminpass123:3,after:3,ajax:2,ajaxform:8,alia:[3,5],all:[0,2,3,5,8,9,10],allow:[0,1,2,7,9],allowoverrid:3,alreadi:[1,3,8,10],also:[0,1,2,10],alter:3,altern:0,altest:3,alwai:[1,3],an:[0,1,2,3,5,6,7,8,9],ani:[1,2,5],ann_proj:8,annot:[2,8,10],annotation_set_rel:0,anonym:0,anoth:[0,3],answer:3,antiti:8,anymor:3,anyth:1,apach:2,apache2:3,apch:3,api:[0,1,6,9],apis_alternate_nam:2,apis_api_exclude_set:2,apis_auto_create_db:3,apis_base_uri:2,apis_ceteicean_css:[0,2],apis_ceteicean_j:[0,2],apis_compon:2,apis_cor:[2,5,6,7,8,9],apis_core_:3,apis_core_apis_test:3,apis_core_mpr:3,apis_db_host:3,apis_db_nam:3,apis_db_password:3,apis_db_port:3,apis_db_us:3,apis_delete_view_templ:2,apis_detail_views_allow:2,apis_detailkjl_views_allow:2,apis_directori:3,apis_ent:[2,5,6,9],apis_iiif_ent_iiif_rel:2,apis_iiif_serv:2,apis_iiif_work_kind:2,apis_label:[0,2],apis_list_view_templ:2,apis_list_views_allow:2,apis_metainfo:[2,7],apis_min_char:2,apis_next_prev:2,apis_openseadragon_css:2,apis_osd_img_prefix:2,apis_osd_j:2,apis_project:3,apis_rel:[2,6,8],apis_relations_filter_exclud:2,apis_server_nam:3,apis_tei:2,apis_tei_text:[0,2],apis_test:3,apis_vocabulari:[0,2,6,9],apisappapissettingsdummyset:3,apisappapissettingsserv:3,apisdev:2,app:[2,5,6,9],app_label_ent:6,app_label_rel:6,app_label_vocabulari:6,appear:0,append:0,appli:10,applic:[2,9],ar:[0,1,2,3,5,7,8,10],arg:[5,7,8,9],argument:5,argv:3,arrai:0,arrow:1,asdaaserffsdfi:3,associ:1,associet:7,attribut:[0,1,2,6,7],austrian:2,auth:1,authent:3,autocomplet:[0,2],automat:[0,2,3,5,7,9],ayi:3,b:[0,5,8],backend:[2,3,7,9],base:[0,1,2,3,6,7,9],baseclass:[0,2],bash:3,basic:1,bat:3,battl:1,becaus:8,been:1,begin:10,behavior:[0,5],beings:1,below:[2,3],best:2,better:[8,10],between:[1,2,5,8,9,10],bibliograph:2,bibliographi:2,bibsonomi:2,bibsonomy_:2,big:1,bin:3,bind:7,biograph:10,biographi:10,birth:[1,10],bit:[0,3,10],book:1,both:[3,8],bower:3,box:2,bridg:3,bring:3,brows:[0,2],build:[1,2],built:[2,3],c:3,call:[2,3,5,9],can:[0,1,2,3,5,7,8,9,10],candid:7,car:1,caus:3,cd:3,cdnj:2,certain:0,cetei:[0,2],ceteicean:[0,2],chang:[0,1,2,3,5],charact:[0,1],choos:3,cidoc:2,citi:1,cl:8,classmethod:[5,8,9],click:[2,3],close:8,cloudflar:2,code:[0,2,3],collect:[0,7,10],collection__:2,collectiontyp:9,column:[0,2],com:[0,2,3],combin:5,come:[2,10],command:3,common:[2,5,7,8,9],complain:8,complex:1,compon:0,compos:2,conf:3,config:3,configur:[2,3,10],confirm:0,confirm_delet:[0,2],connect:[2,3,5,8],consid:5,consist:1,construct:2,constructor:5,contain:[0,5,6,8,9],container_nam:3,context:[2,5],context_processor:2,contrib:1,control:[7,9],conveni:3,convent:2,coordin:10,copi:[2,3],core:[1,2,3,5,6],correct:3,could:5,countri:1,cp:3,creat:[0,1,2,3,5,6,9],create_objct:6,create_relation_methods_from_manytomany_field:5,createsuperus:3,creativ:2,creativecommon:2,crm:2,css:[0,2],current:[2,7,8,9],custom:0,custom_context_processor:2,customis:10,d3j:3,d6i:3,d:3,daemon:3,dai:10,data:2,databas:3,databasepassword:3,databsenam:3,datamodel:0,date:[1,3,5,7,10],db:[3,6],db_:9,deactiv:2,deal:0,debug:3,dedic:2,deem:0,default_authentication_class:0,default_set:6,defin:[0,1,2,5,6,8,9,10],delet:[0,2],deliv:0,demo:2,depend:[0,3,5,8,9,10],depends_on:3,deploi:3,depth:6,deriv:7,describ:[1,2,9],descript:1,design:5,detail:[0,1,2],determin:[0,8],develop:[2,3,10],devop:0,dict:8,dictionari:[0,8],differ:[5,8,9,10],differenti:[5,8],dipslai:2,direct:1,directli:3,directori:[2,3],displai:2,django:[0,1,3,6,8],django_settings_modul:3,django_superuser_email:3,django_superuser_password:3,django_superuser_usernam:3,djangomodelpermiss:0,djangoobjectpermiss:0,doc:2,docker:[0,2,10],document:[3,5,9],documentroot:3,doe:[1,2],doesnotexist:[5,7,8,9],doesnt:6,domain:[3,7],don:3,done:3,dont:3,down:10,download:3,draw:5,driver:3,dtabaseus:3,dummpyset:3,dynam:[5,8],e:[1,2,3,5,8,9,10],each:[1,2,10],earth:1,easi:[2,9],easili:[2,3],ebene_1:2,ebene_2:2,ed:2,edit:[2,3],edu:3,educ:1,eg:3,ehenam:0,either:[2,5,8,9],email:3,employe:10,enabl:5,encapsul:[5,8,9],encod:2,encount:3,end:[1,3],end_dat:[5,8],end_date_written:[5,8],end_end_d:[0,5,8],end_start_d:[0,5,8],enddat:7,engin:3,enter:3,entit:[5,9],entiti:[0,2,3,4,6,7,8,9],entitii:2,entity_class:8,entity_field_nam:[5,9],entity_nam:[5,8,9],entity_typ:8,entityrelationfieldgener:[5,8],entri:[0,1],environ:3,envsubst:3,equal:3,equival:[7,9],etc:[1,2,3,10],event:[1,2,5,6,9],event_relationtype_set:5,event_set:5,eventev:8,eventeventrel:9,eventtyp:9,eventwork:8,eventworkrel:9,everi:[0,1,8,10],everyth:0,exampl:0,excel:2,except:[5,7,8,9],exclud:[0,2],exec:3,execute_from_command_lin:3,exist:[5,6],expect:8,experiment:0,explain:8,extend:[0,2],extern:2,extra:5,extract:8,fail:8,fals:[0,2,3,6,8],featur:[0,2],field:[0,1,2,5,7,8,9],figur:1,file:[0,2,3,6],filter:[0,2,8,10],filter_ann_proj:8,filter_method_to_be_us:0,find:2,first:10,first_nam:5,fit:2,follow:[1,2,3,5,6],force_insert:[7,9],force_upd:[7,9],forenam:10,forget:3,form:[0,2,5,8,9],form_module_list:8,form_ord:0,format:2,formhelper_class:5,forward:6,found:0,foundat:10,from:[0,1,2,3,5,6,7,8,9],frontend:2,full:1,further:[1,2],g:[1,2,3,5,8,9,10],gender:[5,10],gener:[2,5,7,10],generate_all_field:[5,8],generate_relation_field:9,generic_list:[0,2],genericfilterformhelp:5,genericlistviewnew:5,geojson:5,geonam:2,get:[0,3,6,10],get_all_entity_class:5,get_all_entity_nam:5,get_all_relation_class:8,get_all_relation_nam:8,get_all_relationtype_class:9,get_all_relationtype_nam:9,get_context_data:5,get_entity_class_of_nam:5,get_filt:2,get_form_ajax:8,get_next_url:2,get_or_cr:6,get_prev_url:2,get_queryset:5,get_related_:5,get_related_entity_classa:8,get_related_entity_classb:8,get_related_entity_field_nam:[5,9],get_related_entity_field_namea:8,get_related_entity_field_nameb:8,get_related_entity_inst:5,get_related_entity_instancea:8,get_related_entity_instanceb:8,get_related_person_inst:5,get_related_relation_class:5,get_related_relation_field_nam:5,get_related_relation_inst:5,get_related_relation_nam:5,get_related_relationtype_class:5,get_related_relationtype_field_nam:5,get_related_relationtype_inst:5,get_related_relationtype_nam:5,get_related_work_inst:5,get_relation_class_of_nam:8,get_relation_classes_of_entity_class:8,get_relation_classes_of_entity_nam:8,get_relation_field_names_of_entity_class:8,get_relation_names_of_entity_class:8,get_relationtype_class_of_nam:9,get_tabl:5,get_table_dict:8,getgeojson:5,getgeojsonlist:5,getnetjsonlist:5,getnetjsonlistinstitut:5,git:3,github:[0,2],given:[5,6,8,9],gnd:2,go:3,goal:2,goe:0,gohlk:3,good:3,grant:3,graph:2,group:[0,3,7],gui:0,ha:[0,2,5],happen:8,have:[0,1,2,3,8,10],havent:3,header:2,help:5,helper_funct:6,henc:5,her:0,here:[0,5,8,9],hi:0,hierarch:[1,10],hierarchi:1,highlight:[1,2,3,8],hint:8,histori:1,hit:3,hold:[7,9],host:3,how:0,html:[0,2,3,8],http:[0,2,3,6],hub:3,human:1,id:[0,2,5,7,8],iiif:2,imag:[0,2],implement:[1,8],import_rel_vocab:2,importcollect:9,includ:[0,1,3],include_al:8,index:2,info:2,inform:7,infrastructur:3,inject:5,insert:[7,9],insist:[7,9],inspect:0,instal:[0,10],installed_app:2,instanc:[0,3,5,6,7,8,9,10],instanti:8,instead:[0,8],institut:[1,2,5,6,9,10],institution_relationtype_set:5,institution_set:5,institutionev:8,institutioneventrel:9,institutioninstitut:8,institutioninstitutionrel:9,institutionplac:[5,8],institutionplace_set:5,institutionplacerel:[5,9],institutiontyp:9,institutionwork:8,institutionworkrel:9,instruct:0,intend:3,intent:2,interest:[0,10],intern:[0,1,2,3,10],io:[0,2],ip:3,is_dev_vers:2,isauthent:0,item:[0,5],iter:5,its:[0,2,8],javascript:3,join:3,js:[0,2,3],json:[2,5],just:2,keep:[1,9,10],kei:8,keyword:5,kind:[0,1,2,5,6],kind_form:8,knowledg:2,kwarg:[5,6,7,8,9],label:[0,2,3,6,9],labeltyp:[0,9],last:1,lat:[0,2,5],later:8,latest:3,latitud:[1,10],laut:0,legal:1,let:2,letter:1,level:[0,2],lexicon:2,lfd:3,lib:2,librari:[2,3],like:[0,1,2,3,10],line:3,link:[2,3,10],linux:2,list:[0,2,5,8,9,10],list_filt:0,littl:10,ll:2,lng:[0,2,5],load:[7,8],loaded_tim:7,local:3,localhost:3,locat:2,log:[0,2],logic:[5,8,9],longitud:[1,10],look:3,lot:1,lower:[5,8,9],m_obj:6,machin:3,mai:5,main:[0,8,9],mainli:[0,1],make:1,makemigr:3,manag:[3,5,8],mandatori:2,mani:7,manytomani:[5,9],manytomanymanag:5,mark:7,match:2,mean:[0,10],mention:[1,6],menu:2,merg:[0,6],meta:[1,2],metadata:0,metainfo:[2,3,4,9],method:[0,2,5,7,8,9],might:3,migrat:3,min:2,mind:1,minim:0,miss:[2,3],mit:2,mkl:3,mnodular:2,mod_wsgi:3,model:[0,2,4,6,10],modul:[2,3,5,8,9],more:[0,3,10],most:[0,5],mother:1,multipleobjectsreturn:[5,7,8,9],must:[3,5,6,7,9],my:[3,5],my_us:3,myprocect:2,mysql:3,mysql_databas:3,mysql_native_password:3,mysql_password:3,mysql_root_password:3,mysql_us:3,name:[0,1,2,3,5,6,8,9],name_label_filt:0,name_of_the_attribut:0,name_of_the_whl_fil:3,name_revers:[1,2],namensform:0,narr:10,narrow:10,natur:1,necessari:5,need:[0,1,2,3,5,10],network:[2,3,5],nevertheless:[5,9],next:[2,3],nginx:3,ngx_apis_:3,ngx_apis_apis_test:3,ngx_apis_mpr:3,node:3,nodej:3,non:[7,9],none:[5,8,9],normal:[0,7,9],note:[0,1,2,5,8,9],noth:6,now:3,npm:3,number:3,numpi:3,o1psh:3,objct:6,object:[0,2,5,6,7,8],objectid:8,obvious:1,oeaw:2,off:3,offset:[1,2],onc:[0,3],one:[0,2,5,7,8,9],ones:3,onli:[0,5,8],onward:3,open:3,openseadragon:2,oper:3,option:[1,2,3],order:[0,1,9],ore:7,org:[2,3],organ:2,organis:1,os:3,other:[1,2,5,8,9],otherwis:2,our:[1,3],out:2,overrid:[2,7,9],overridden:[5,8],own:[0,2],p:3,packag:3,page:[0,2],page_s:0,pagin:5,paint:1,param:[2,6,8],paramet:[2,5,6,7,8,9],paramt:2,parent:[1,2],parent_class:[1,2],pars:[2,5,6,7],parse_d:7,parser:6,part:1,part_of:[0,2],particular:10,pass:5,password:3,path:[0,2,3],permiss:0,persist:6,person:[1,2,5,6,8,9,10],person_inst:5,persona_relationtype_set:5,persona_set:[5,9],personb_relationtype_set:5,personb_set:[5,9],personev:8,personevent_set:8,personeventrel:9,personinstitut:8,personinstitution_set:8,personinstitutionrel:9,personperson:[5,8],personpersonrel:9,personpersonrelation_inst:9,personplac:[0,1,2,5,8],personplace_set:[5,8],personplacerel:[5,9],personwork:8,personwork_set:8,personworkrel:[2,9],pip:3,pipenv:3,pk:5,place:[0,1,2,5,6,8,9,10],place_inst:5,place_relationtype_set:5,place_set:5,placeev:[5,8],placeevent_set:5,placeeventrel:[5,9],placeperson:1,placeplac:[5,8],placeplace_set:5,placeplacerel:[5,9],placetyp:9,placework:[5,8],placework_set:5,placeworkrel:[5,9],plan:3,pleas:[0,1,2,10],plugin:3,poetri:3,point:3,pop:3,port:3,possibl:[0,2,5],potenti:5,predefin:10,prefer:6,prerequisit:2,present:3,preserve_uri_minut:6,presid:10,prev:2,prize:1,problem:3,problemat:3,proce:3,process:[2,6,7,9],produc:1,product:[0,3],profess:9,professiontyp:9,project:[2,10],project_nam:3,prompt:3,proper:3,protocol:2,provid:[2,5,8,9],provis:0,pseudonym:0,publish:[0,5,8],pull:3,purpos:[5,9],py:[0,2,3],python:[2,3,5,8,9],pythonlib:3,pyton3:3,queri:8,queryset:[5,8],question:[3,10],r:3,rather:2,rdf:[2,6],rdf_default_set:6,rdf_link:7,rdf_set:6,rdfparser:[2,4],reason:[0,2],recogn:7,recommend:3,redirect:2,refer:[0,1,2,5,8,10],regex:7,rel_filt:2,relat:[0,2,3,4,5,6,7,9],related_entity_nam:0,related_person:[0,8],related_person__first_nam:0,related_person__nam:0,related_persona:8,related_personb:8,related_plac:0,related_place__nam:0,related_relationtype_nam:0,related_work:8,relation_nam:8,relation_typ:0,relation_type__:0,relation_type__descript:2,relation_type__nam:0,relation_type__name_revers:2,relation_type__parent_class:2,relation_type__statu:2,relation_type__vocab_nam:2,relationbaseclass:9,relationpublishedqueryset:8,relationtyp:[5,9],relationtype_field_nam:5,relationtype_nam:9,religion:1,reload:3,remov:[1,3],renam:3,render:[0,5,8],render_to_respons:5,replac:0,repo:3,repositori:2,request:[5,8],requir:[3,8],reseachcollect:9,research:[2,10],resid:[3,10],resolv:5,resolve_ambigue_plac:5,respect:[0,5,7,8,9],respons:5,response_class:5,response_kwarg:5,rest:9,rest_framework:2,restapi:[0,2],restart:3,restframework:0,restful:2,restrict:2,result:[0,5,10],retriev:[5,8,9],reus:2,revers:1,review:[0,5,7,8],revis:1,root:[2,3],rootpwd:3,row:2,run:3,runserv:3,runtim:8,s:[5,8,9],sa:2,sai:2,same:2,samea:6,save:[0,5,6,7,8,9],save_ajax_form:8,schema:1,script:3,search:[0,2,10],secret_kei:3,section:0,secur:3,see:1,select:10,self:[5,6],semant:2,sennier:3,seper:9,serial:[0,2],serv:2,server:3,server_alia:3,server_nam:3,serveralia:3,servernam:3,servic:3,set:[0,1,2,3,6,7,8,9,10],setdefault:3,settings_test_ci:3,settingsfil:0,setup:3,sever:[0,3,5,9],sh:3,sharealik:2,sheet:2,shortcut:5,should:[0,2,3,7,8,9],shouldn:0,show:0,shown:8,side:[5,8],similar:[1,2],simpl:[2,10],simplifi:1,sinc:8,singl:[2,5],site:3,siteid:8,size:0,sko:[1,2],so:[2,3,5,9],some:[0,1],somehow:5,someon:1,someth:3,sort:5,sourc:[0,2,3,5,6,7,8,9],specif:[0,2,5,8,9,10],specifi:[0,1,6],split:1,sql:[7,9],sqlite3:3,sqlite:3,stanbol:2,start:[1,3,6,7,10],start_dat:[5,8],start_date_written:[5,8],start_end_d:[0,5,8],start_start_d:[0,5,8],static_dir:3,staticfil:3,statu:[0,5,8],step:2,store:[1,2,6,7,9],str:[5,8,9],string:[0,2,5,6,7],structur:[1,2,10],studi:10,sub:2,subcategori:10,subclass:[5,7,9],sublcass:5,subset:0,subtyp:9,suggest:[0,3],suitabl:10,superus:3,support:[2,5],surnam:10,sy:3,syntax:5,system:[2,3,10],t:[0,3],tabel:8,tabl:[3,5],table_field:[0,2],tag:3,take:2,target:[0,1],taufnam:0,tei:[0,2],teic:[0,2],temp_ent:[0,2],tempentityclass:[0,2,7],tempentityclass_ptr:[5,8],templat:[0,2,3,5],templateresponsemixin:5,tempor:9,term:2,test:[6,8],testdb:3,testpwd:3,testus:3,text:[0,1,2,7,8,9],texttyp:9,thees:2,thei:[5,7,9],them:[2,8],therefor:[0,2],therein:5,thi:[0,1,2,3,5,7,8,9],thing:[2,5],third:1,those:[2,8],though:1,through:[3,10],thu:1,titl:9,todo:2,too:1,took:1,tool:0,touch:0,transcript:[0,2],trigger:0,turn:3,turn_form_modules_into_dict:8,two:[5,10],txt:3,type:[0,2,5,6,8,9,10],u35:3,uci:3,ud2:3,under:[2,3],understand:[5,10],understood:5,univers:10,unless:2,unstructur:7,up:[0,1,3,10],updat:[7,9],uri:[0,2,5,6,7,9],uri_check:6,uri_replace_set:6,uri_set:6,uricandid:7,url:[0,2,6],urlconf:5,us:[0,1,2,3,5,6,7,8,9,10],use_pref:6,user:[0,1,2,3],usernam:3,v0:3,valid:8,valu:[2,5,8],variabl:[2,3],variou:[5,8,9],version:[3,5],via:[2,8],view:[0,2,4,10],virtualenv:3,virtualhost:3,visit:2,visual:2,vocab:2,vocabnam:9,vocabsbaseclass:9,vocabsuri:9,vocabulari:[2,3,4,6],volum:3,vovcabulari:9,wa:[1,5,6,10],wai:[3,5],want:[0,2,7,9],war:1,warn:3,we:[0,1,2,3,6,8,9],web:[2,3],webapp:[1,3],webpag:[0,2,3],webpage_content_processor:2,webpagestaticwebpagelibrari:3,webserv:3,weiter:0,well:[2,3],whatev:2,wheel:3,when:[1,5,8],where:[3,5,8],whether:0,which:[2,5,7,8,9,10],whl:3,whole:2,wien:10,wildcard:0,window:2,wire:[5,9],within:[1,2,5,8,9],without:[2,5],work:[1,2,5,6,8,9,10],work_relationtype_set:5,work_set:5,workspac:6,worktyp:9,workwork:8,workworkrel:9,would:1,written:[0,2,7],wsgi:2,wsgidaemonprocess:3,wsgiprocessgroup:3,wsgiscriptalia:3,www:3,xml:[0,2],yet:[0,3,6],yml:6,you:[0,2,3,7,9,10],your:[0,2,3,8,10],your_url:3,your_virtualenv_nam:3,zlckxkw73c3:3,zotero_:2},titles:["Configuration","Data Model","Welcome to APIS\u2019s documentation!","Installation with Docker","Internal API","Entities","RDFParser","Metainfo","Relations","Vocabularies","User documentation"],titleterms:{"export":10,annot:1,apach:3,api:[2,3,4,10],apis_alternate_nam:0,apis_api_exclude_set:0,apis_base_uri:0,apis_compon:0,apis_delete_view_templ:0,apis_detail_views_allow:0,apis_ent:0,apis_list_view_templ:0,apis_list_views_allow:0,apis_min_char:0,apis_next_prev:0,apis_rel:0,apis_relations_filter_exclud:0,apis_tei:0,box:3,build:10,command:2,compos:3,configur:0,content:[2,4],custom:2,data:[1,10],delet:10,docker:3,document:[2,10],edit:10,entiti:[1,5,10],find:10,graph:10,highlight:10,imag:3,indic:2,instal:[2,3],intern:4,licens:2,linux:3,manag:2,metainfo:7,model:[1,5,7,8,9],network:10,own:10,packag:2,prerequisit:3,rdfparser:6,readm:2,relat:[1,8,10],rest_framework:0,s:2,serv:3,tabl:2,text:10,user:10,via:3,view:[5,8],visual:10,vocabulari:[1,9,10],welcom:2,window:3,within:10,without:3,wsgi:3}})