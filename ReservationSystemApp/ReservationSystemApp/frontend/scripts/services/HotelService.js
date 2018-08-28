import {
    settings
} from '../config/settings';
import {
    links
} from '../config/links';
import RequestOptions from '../constants/RequestOptions';

class HotelService {
    static getHotel(id) {
        const path = links.HOTEL_REQUEST_PATH(id);
        const options = RequestOptions.createGetOptions();
        return fetch(settings.baseUrl + path, options);
    }

    static createHotel(hotelInfo) {
        const path = links.HOTEL_SEARCH_PAGE;
        const token = localStorage.getItem('token');
        const options = RequestOptions.createPostOptions(hotelInfo, token);
        return fetch(settings.baseUrl + path, options);
    }

    static getHotelLocations(all) {
        const path = all ? links.ALL_LOCATIONS_LIST : links.HOTEL_LOCATIONS_LIST;
        const options = RequestOptions.createGetOptions();
        return fetch(settings.baseUrl + path, options);
    }

    static getHotelPageWithQuery(query) {
        let path = `${links.HOTEL_SEARCH_PAGE}${query}`;
        const options = RequestOptions.createGetOptions();
        return fetch(settings.baseUrl + path, options);
    }

    static update(id, info) {
        const path = links.HOTEL_API_PAGE(id);
        const token = localStorage.getItem('token');
        const options = RequestOptions.createPutOptions(info, token);
        return fetch(settings.baseUrl + path, options);
    }

    static remove(id) {
        const path = links.HOTEL_API_PAGE(id);
        const token = localStorage.getItem('token');
        const options = RequestOptions.createDeleteOptions(token);
        return fetch(settings.baseUrl + path, options);
    }
}

export default HotelService;