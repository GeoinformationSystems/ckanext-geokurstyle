import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit
from ckantoolkit import config

# from ckanext.geokurstyle.logic import (read_rdf_auth, read_rdf)
from ckanext.geokurstyle.logic import read_rdf

class GeokurstylePlugin(plugins.SingletonPlugin):
    plugins.implements(plugins.IConfigurer)
    plugins.implements(plugins.IDatasetForm)
    plugins.implements(plugins.IValidators)
    plugins.implements(plugins.ITemplateHelpers)
    plugins.implements(plugins.IRoutes)
    # plugins.implements(plugins.IAuthFunctions)
    plugins.implements(plugins.IActions)


    # REGISTER THE PLUGINS ACTIONS
    def get_actions(self):
        return {
            'read_rdf': read_rdf
        }

    # REGISTER TEH PLUGINS HELPER TEMPLATE HELPER FUNCTIONS
    def get_helpers(self):
        return {
            # don't register any helper
            # 'geokurstyle_read_rdf': read_rdf
        }

    # REGISTER THE PLUGINS AUTH FUNCTIONS
    # dont need our own auth functions, just check if user can create packages
    # def get_auth_functions(self):
    #     return {
    #         'read_rdf': read_rdf_auth
    #     }


    def get_validators(self):
        return {
        }

    def is_fallback(self):
        # Return True to register this plugin as the default handler for
        # package types not handled by any other IDatasetForm plugin.
        return True

    def package_types(self):
        # This plugin doesn't handle any special package types, it just
        # registers itself as the default (above).
        return []

    def update_config(self, config):
        # Add this plugin's templates dir to CKAN's extra_template_paths, so
        # that CKAN will use this plugin's custom templates.
        toolkit.add_template_directory(config, 'templates')
        toolkit.add_public_directory(config, 'public')
        toolkit.add_resource('assets', 'ckanext-geokurstyle')
        toolkit.add_resource('public', 'ckanext-geokurstyle')


    def before_map(self, map):      
        return map

    def after_map(self, map):
        map.connect('ingest rdf', '/ingest-rdf',
                    controller='ckanext.geokurstyle.controller:GeokurstyleController',
                    action='ingest_rdf')
        map.connect('add_metric', '/add-metric',
                    controller='ckanext.geokurstyle.controller:GeokurstyleController',
                    action='add_metric')
        map.connect('add_dimension', '/add-dimension',
                    controller='ckanext.geokurstyle.controller:GeokurstyleController',
                    action='add_dimension')
        map.connect('add_category', '/add-category',
                    controller='ckanext.geokurstyle.controller:GeokurstyleController',
                    action='add_category')        
        map.connect('legal_notice', '/legal-notice',
                    controller='ckanext.geokurstyle.controller:GeokurstyleController',
                    action='legal_notice')
        map.connect('quality_register', '/quality-register',
                    controller='ckanext.geokurstyle.controller:GeokurstyleController',
                    action='quality_register')
        return map
