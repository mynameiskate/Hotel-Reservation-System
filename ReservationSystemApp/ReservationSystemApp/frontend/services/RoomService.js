import {
    settings
} from '../config/settings.js';
import {
    links
} from '../config/links.js';
import RequestOptions from '../constants/RequestOptions';

class RoomService {
    static getRoomPageWithQuery(id, query = '') {
        let path = `${links.ROOM_ID_PAGE(id)}${query}`;
        const options = RequestOptions.createGetOptions();
        return fetch(settings.baseUrl + path, options);
    }

    static book(roomId) {
        let path = links.BOOKING_ID_PAGE(roomId);
        const token = localStorage.getItem('token');
        const options = RequestOptions.createGetOptions(token);
        return fetch(settings.baseUrl + path, options);
    }
}

export default RoomService;