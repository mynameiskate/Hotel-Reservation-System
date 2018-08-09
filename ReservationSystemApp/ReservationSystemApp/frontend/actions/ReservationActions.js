import moment from 'moment';

import {
    reservationConstants
} from '../constants/reservationConstants.js';
import RoomService from '../services/RoomService.js';

class ReservationActions {
    static book(roomId) {
        const bookFailure = (id, error) => {
            return {
                type: reservationConstants.BOOK_FAILURE,
                payload: {
                    id,
                    error
                }
            };
        };
        const bookSuccess = (id) => {
            return {
                type: reservationConstants.BOOK_SUCCESS,
                payload: {
                    id
                }
            };
        };
        const bookRequest = (id) => {
            return {
                type: reservationConstants.BOOK_REQUEST,
                payload: {
                    id
                }
            };
        };

        return (dispatch, stateAccessor) => {
            const {
                moveInDate,
                moveOutDate
            } = stateAccessor().search;

            const reservation = {
                hotelRoomId: roomId,
                created: moment().format('YYYY-MM-DD[T]HH:mm:ss'),
                status: 'pending'
            };

            if (moveInDate) {
                reservation.moveInDate = moveInDate.format('YYYY-MM-DD[T]HH:mm:ss');
            }

            if (moveOutDate) {
                reservation.moveOutDate = moveOutDate.format('YYYY-MM-DD[T]HH:mm:ss');
            }

            dispatch(bookRequest(roomId));
            RoomService.bookRoom(reservation)
                .then(handleError)
                .then(dispatch(bookSuccess(roomId)))
                .catch(error => dispatch(bookFailure(roomId, error)));
        }
    }
}

let handleError = function(response) {
    if (!response.ok) {
        throw Error(response.status)
    }
    return response;
}

export default ReservationActions;