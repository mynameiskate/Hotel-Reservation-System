import { settings } from '../config/settings.js';
import { links } from '../config/links.js';
import RequestOptions from '../constants/RequestOptions';

class UserService {
    static logIn(info) {
        const path = links.SIGN_IN_PAGE;
        const options = RequestOptions.createPostOptions(info);
        return fetch(settings.baseUrl + path, options);
    }

    static getProfile() {
        const path = links.PROFILE_PAGE;
        const token = localStorage.getItem('token');
        const options = RequestOptions.createGetOptions(token);
        return fetch(settings.baseUrl + path, options);
    }

    static signUp(info) {
        const path = links.SIGN_UP_PAGE;
        const options = RequestOptions.createPostOptions(info);
        return fetch(settings.baseUrl + path, options);
    }
}

export default UserService;