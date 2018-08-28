import RequestOptions from '../constants/RequestOptions';

class RequestService {
    constructor(baseUrl = '') {
        this.baseUrl = baseUrl;
    }

    request(path, options) {
        return fetch(this.baseUrl + path, options);
    }

    get(url, token = null) {
        const options = RequestOptions.createGetOptions(token);
        return this.request(url, options);
    }

    post(url, body) {
        const options = RequestOptions.createPostOptions(body);
        return this.request(url, options);
    }

    handleError = function(response) {
        if (!response.ok) {
            throw Error(response.status)
        }
        return response;
    }
}

export const requestService = new RequestService();