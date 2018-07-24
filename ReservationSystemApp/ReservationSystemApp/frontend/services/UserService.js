import { settings } from '../config/settings.js';
import { links } from '../config/links.js';

class UserService {
    static logIn(info) {
        const path = links.SIGN_IN_PAGE;
        const options = {
            method: 'POST',
            body: JSON.stringify(info),
            dataType: 'json',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }
        return fetch(settings.baseUrl + path, options);
    }

    static getProfile() {
        const path = links.PROFILE_PAGE;
        const options = {
            method: 'GET',
            credentials: 'include'
        };

        return fetch(settings.baseUrl + path, options);
    }

    static signUp(info) {
        const path = links.SIGN_UP_PAGE;
        const options = {
            method: 'POST',
            body: JSON.stringify(info),
            dataType: 'json',
            headers: { 'Content-Type': 'application/json' }
        }
        return fetch(settings.baseUrl + path, options);
    }
}

export default UserService;