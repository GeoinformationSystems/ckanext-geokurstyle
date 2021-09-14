import ckan.plugins as p
import ckan.lib.helpers as h

import ckan.lib.base as base
import os

import ckan.plugins.toolkit as toolkit
import ckanext.dcat.utils as utils

import ckan.logic as logic
import ckan.lib.navl.dictization_functions as dict_fns


class GeokurstyleController(base.BaseController):

    def render_add_metric(self):
        return base.render('geokurstyle/add_metric.html')
    def render_add_dimension(self):
        return base.render('geokurstyle/add_dimension.html')
    def render_add_category(self):
        return base.render('geokurstyle/add_category.html')
    def render_quality_register(self):
        return base.render('geokurstyle/quality_register.html')
    def render_legal_notice(self):
        return base.render('geokurstyle/legal_notice.html')
    def render_ingest_rdf(self):
        return base.render('geokurstyle/ingest_rdf.html')
