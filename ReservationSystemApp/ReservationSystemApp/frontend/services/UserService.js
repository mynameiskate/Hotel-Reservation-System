import { settings } from '../config/settings.js';
import { links } from '../config/links.js';

class UserService {
    static logIn(info){
        const path = links.SIGN_IN_PAGE;
        const options = {
            method: 'PUT',
            body: JSON.stringify(info),
            dataType: 'json',
            headers: { 'Content-Type': 'application/json' }
        }
        return fetch(settings.baseUrl + path, options);
    }  
}

export default UserService;