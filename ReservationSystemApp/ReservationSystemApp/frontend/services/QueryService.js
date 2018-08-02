import queryString from 'query-string';

class QueryService {
    static getParams(query) {
        return queryString.parse(query);
    }

    static buildQuery(params, path = '') {
        return `${path}?${queryString.stringify(params)}`;
    }

    static addParameter(name, parameter, query, path = '') {
        let params = this.getParams(query);
        return this.buildQuery({...params,
            [name]: parameter
        }, path);
    }
}

export default QueryService;