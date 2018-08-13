import {
    settings
} from '../config/settings.js';
import {
    links
} from '../config/links.js';
import RequestOptions from '../constants/RequestOptions';

class HotelService {
    static getHotel(id) {
        const path = links.HOTEL_REQUEST_PATH(id);
        const options = RequestOptions.createGetOptions();
        return fetch(settings.baseUrl + path, options);
    }

    static getLocations() {
        const path = links.LOCATION_LIST;
        const options = RequestOptions.createGetOptions();
        return fetch(settings.baseUrl + path, options);
    }

    static getHotelPageWithQuery(query) {
        let path = `${links.HOTEL_SEARCH_PAGE}${query}`;
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