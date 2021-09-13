import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit

import ckan.lib.helpers as helpers

class GeokurstylePlugin(plugins.SingletonPlugin):
    plugins.implements(plugins.IConfigurer)
    plugins.implements(plugins.IDatasetForm)
    plugins.implements(plugins.IRoutes)
    plugins.implements(plugins.IPackageController, inherit=True)


    # IConfigurer

    def update_config(self, config):
        # Add this plugin's templates dir to CKAN's extra_template_paths, so
        # that CKAN will use this plugin's custom templates.
        toolkit.add_template_directory(config, 'templates')
        toolkit.add_public_directory(config, 'public')
        toolkit.add_resource('assets', 'ckanext-geokurstyle')
        toolkit.add_resource('public', 'ckanext-geokurstyle')


    # IDatasetForm

    def is_fallback(self):
        # Return True to register this plugin as the default handler for
        # package types not handled by any other IDatasetForm plugin.
        return True
        
    def package_types(self):
        # This plugin doesn't handle any special package types, it just
        # registers itself as the default (above).
        return []

    
    # IRoutes

    def before_map(self, map):
        # Plugin into the setup of the routes map creation.
        # Called before the routes map is generated.
        return map

    def after_map(self, map):
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


    # IPackageController

    def after_show(self, context, pkg_dict):
        # Add fully qualified uri to package_show
        pkg_dict[u'uri'] = helpers.url_for('dataset.read', id=pkg_dict[u'id'], qualified=True)
        return pkg_dict
