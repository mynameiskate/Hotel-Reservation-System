import { settings } from '../config/settings.js';
import { links } from '../config/links.js';

class HotelService {
    static getAll() {
        const path = links.HOTEL_LIST_PAGE;
        const options = {
            method: 'GET',
        };
        return fetch(settings.baseUrl + path, options);
    }

    static getHotel(id) {
        const path = links.HOTEL_ID_PAGE(id);
        const options = {
            method: 'GET'
        };

        return fetch(settings.baseUrl + path, options);
    }

    static update(id, info) {
        const path = links.HOTEL_ID_PAGE(id);
        const options = {
            method: 'PUT',
            body: JSON.stringify(info),
            dataType: 'json',
            headers: { 'Content-Type': 'application/json' }
        };

        return fetch(settings.baseUrl + path, options);
    }

    static remove(id) {
        const path = links.HOTEL_ID_PAGE(id);
        const options = {
            method: 'DELETE'
        };
        return fetch(settings.baseUrl + path, options);
    }
}

export default HotelService;