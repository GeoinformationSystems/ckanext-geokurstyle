import ckan.plugins as p
import ckan.lib.helpers as h

import ckan.lib.base as base
import os

import ckan.plugins.toolkit as toolkit
import ckanext.dcat.utils as utils

import ckan.logic as logic
import ckan.lib.navl.dictization_functions as dict_fns


class GeokurstyleController(base.BaseController):

    def add_metric(self):
        return base.render('geokurstyle/add_metric.html')
    def add_dimension(self):
        return base.render('geokurstyle/add_dimension.html')
    def add_category(self):
        return base.render('geokurstyle/add_category.html')
    def quality_register(self):
        return base.render('geokurstyle/quality_register.html')
    def legal_notice(self):
        return base.render('geokurstyle/legal_notice.html')



    def ingest_rdf(self):

        # content = toolkit.request.params
        # content = toolkit.request
        # content = toolkit.get_action('read_rdf')({}, {'rdf': 'test'})
        
        return base.render('geokurstyle/render_ex.html')
