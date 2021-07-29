import ckan.plugins as p
import ckan.lib.helpers as h

import ckan.lib.base as base


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