import { settings } from '../config/settings.js';
import { links } from '../config/links.js';
import RequestOptions from '../constants/RequestOptions';

class HotelService {
    static getAll() {
        const path = links.HOTEL_LIST_PAGE;
        const options = RequestOptions.createGetOptions();
        return fetch(settings.baseUrl + path, options);
    }

    static getHotel(id) {
        const path = links.HOTEL_ID_PAGE(id);
        const options = RequestOptions.createGetOptions();
        return fetch(settings.baseUrl + path, options);
    }

    static getLocations() {
        const path = links.LOCATION_LIST;
        const options = RequestOptions.createGetOptions();
        return fetch(settings.baseUrl + path, options);
    }

    static filterHotels(params) {
        const path = RequestOptions.buildUri(links.HOTEL_FILTER_PAGE, params);
        const options = RequestOptions.createGetOptions();
        return fetch(settings.baseUrl + path, options);
    }

    static update(id, info) {
        const path = links.HOTEL_ID_PAGE(id);
        const options = RequestOptions.createPutOptions(info);
        return fetch(settings.baseUrl + path, options);
    }

    static remove(id) {
        const path = links.HOTEL_ID_PAGE(id);
        const options = RequestOptions.createDeleteOptions();
        return fetch(settings.baseUrl + path, options);
    }
}

export default HotelService;