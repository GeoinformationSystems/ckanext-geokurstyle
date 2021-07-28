import ckan.plugins as p
import ckan.lib.helpers as h

import ckan.lib.base as base


class GeokurstyleController(base.BaseController):

    def add_metric(self):
        return base.render('geokurstyle/add_metric.html')
    def quality_register(self):
        return base.render('geokurstyle/quality_register.html')
    def legal_notice(self):
        return base.render('geokurstyle/legal_notice.html')