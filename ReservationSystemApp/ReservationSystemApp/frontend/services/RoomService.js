import {
    settings
} from '../config/settings';
import {
    links
} from '../config/links';
import RequestOptions from '../constants/RequestOptions';

class RoomService {
    static updateHotelRoom(hotelId, roomId, roomInfo) {
        let path = links.ROOM_ID_PAGE_PATH(hotelId, roomId);
        const token = localStorage.getItem('token');
        const options = RequestOptions.createPutOptions(roomInfo, token);
        return fetch(settings.baseUrl + path, options);
    }

    static getHotelRoom(hotelId, roomId) {
        let path = links.ROOM_REQUEST_PATH(hotelId, roomId);
        const options = RequestOptions.createGetOptions();
        return fetch(settings.baseUrl + path, options);
    }

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

    static getPossibleServices() {
        const path = links.SERVICE_CREATION_LIST;
        const options = RequestOptions.createGetOptions();
        return fetch(settings.baseUrl + path, options);
    }
}

export default RoomService;