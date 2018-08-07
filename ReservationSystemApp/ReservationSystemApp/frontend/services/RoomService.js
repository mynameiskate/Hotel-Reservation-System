import {
    settings
} from '../config/settings.js';
import {
    links
} from '../config/links.js';
import RequestOptions from '../constants/RequestOptions';

class RoomService {
    static getRoomPageWithQuery(id) {
        let path = links.ROOM_PAGE(id);
        const options = RequestOptions.createGetOptions();
        return fetch(settings.baseUrl + path, options);
    }
}

export default RoomService;