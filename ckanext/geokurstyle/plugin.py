import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit


class GeokurstylePlugin(plugins.SingletonPlugin):
    plugins.implements(plugins.IConfigurer)
    plugins.implements(plugins.IDatasetForm)
    plugins.implements(plugins.IValidators)
    plugins.implements(plugins.ITemplateHelpers)
    plugins.implements(plugins.IRoutes)

    # IConfigurer

    def get_validators(self):
        return {
        }

    def get_helpers(self):
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
        map.connect('add_metric', '/add-metric',
                    controller='ckanext.geokurstyle.controller:GeokurstyleController',
                    action='add_metric')
        # map.connect('edit_process', '/edit-process',
        #             controller='ckanext.geokurstyle.controller:GeokurstyleController',
        #             action='edit_process')
        map.connect('quality_register', '/quality-register',
                    controller='ckanext.geokurstyle.controller:GeokurstyleController',
                    action='quality_register')
        return map
