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

    static bookRoom(reservationInfo) {
        let path = links.BOOKING_ID_PAGE(reservationInfo.hotelRoomId);
        const token = localStorage.getItem('token');
        const options = RequestOptions.createPostOptions(reservationInfo, token);
        return fetch(settings.baseUrl + path, options);
    }

    static updateReservation(reservationInfo) {
        let path = links.BOOKING_ID_PAGE(reservationInfo.roomReservationId);
        const token = localStorage.getItem('token');
        const options = RequestOptions.createPutOptions(reservationInfo, token);
        return fetch(settings.baseUrl + path, options);
    }

    static getServices(hotelId) {
        const path = links.SERVICE_LIST(hotelId);
        const options = RequestOptions.createGetOptions();
        return fetch(settings.baseUrl + path, options);
    }
}

export default RoomService;