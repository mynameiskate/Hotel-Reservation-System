import { hotelService } from 'HotelService.1.js';
import { links } from '../config/links.js';
import RequestOptions from '../constants/RequestOptions';

class RequestService {
    constructor(baseUrl = '') {
        this.baseUrl = baseUrl;
    }

    callFetch(path, options) {
        return fetch(this.baseUrl + path, options);
    }

    createGetRequest(url, token = null) {
        const options = RequestOptions.createGetOptions(token);
        return this.callFetch(url, options);
    }

    createPostRequest(url, body) {
        const options = ReqnpuestOptions.createPostOptions(body);
        return this.callFetch(url, options);
    }
}

export export const requestService = new RequestService();