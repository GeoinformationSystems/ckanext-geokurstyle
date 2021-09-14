
from ckan.plugins import toolkit
from ckanext.dcat.processors import RDFParser



# @toolkit.auth_allow_anonymous_access
# def read_rdf_auth(context, data_dict):
#     '''
#     All users can access DCAT endpoints by default
#     '''
#     return {'success': True}

def read_rdf(context, data_dict):
    '''
    Method that parses RDF-Package-Metadata that is according to
    the GeoKurDCAT Metadata-Scheme to CKANs internal Metadata-Format.
        Parser-Class with parse()-method is provided/defined by/in 
    ckanext-dcat. 

    data_dict = {
        'rdf' : <geokurdcat-rdf-package-metadata>
        'org' : <an register organisation of this CKAN instance where 
                the user is allowed to create packages.>
    }


    Method is accessible via POST-Request, which can be implemented
    in JS as follows:
    <script>
        async function postData(url = '', data = {}) {
            // Default options are marked with *
            const response = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache', 
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow', 
                referrerPolicy: 'no-referrer', 
                body: JSON.stringify(data)
            });
            return response.json(); 
        }
        document.getElementById('...').onclick = function () {
            data = { 'rdf': '<rdf-content>', 'org': '<org>' };
            postData('/api/action/read_rdf', data)
                .then(data => {
                    console.log(data)
                });
        };
    </script>
    '''
    try:
        toolkit.check_access('package_create', context, data_dict)
    except:
        return {'error': True, 'msg': 'not_authorized', 'trace': None}

    parser = RDFParser()
    try:
        parser.parse(data_dict['rdf'], _format = 'ttl')
    except Exception as e:
        return {'error': True, 'msg': 'malformed',  'trace': str(e)}

    
    for package in parser.datasets():
        # return package
        package['owner_org'] = data_dict['org']
        toolkit.get_action('package_create')(context, package)
        return ({'error': False, 'msg': package['name'], 'trace': None})

    