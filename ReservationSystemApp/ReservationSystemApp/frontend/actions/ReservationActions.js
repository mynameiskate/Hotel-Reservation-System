import moment from 'moment';

import {
    reservationConstants
} from '../constants/reservationConstants';
import RoomService from '../services/RoomService';
import {
    dateFormats
} from '../constants/dateFormats';

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
                created: moment().format(dateFormats.CREATION_TIME_FORMAT),
                status: 'pending'
            };

            if (moveInDate) {
                reservation.moveInDate = moveInDate.format(dateFormats.CREATION_TIME_FORMAT);
            }

            if (moveOutDate) {
                reservation.moveOutDate = moveOutDate.format(dateFormats.CREATION_TIME_FORMAT);
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