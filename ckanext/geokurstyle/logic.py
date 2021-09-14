
from ckan.plugins import toolkit
from ckanext.dcat.processors import RDFParser



# @toolkit.auth_allow_anonymous_access
# def read_rdf_auth(context, data_dict):
#     '''
#     All users can access DCAT endpoints by default
#     '''
#     return {'success': True}

def read_rdf(context, data_dict):
    try:
        toolkit.check_access('package_create', context, data_dict)
    except:
        return 'Not authorized. Please log in or register an account.'

    parser = RDFParser()
    try:
        parser.parse(data_dict['rdf'], _format = 'ttl')
    except:
        return 'Malformed RDF, did you use RDF-Turtle?'

    
    for package in parser.datasets():
        # return package
        package['owner_org'] = data_dict['org']
        toolkit.get_action('package_create')(context, package)
        return(package['name'])

    