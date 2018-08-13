import moment from 'moment';

import {
    reservationConstants
} from '../constants/reservationConstants';
import RoomService from '../services/RoomService';
import {
    dateFormats
} from '../constants/dateFormats';
import {
    statuses
} from '../constants/reservationStatuses';
import MomentExtensions from '../extensions/MomentExtensions';

class ReservationActions {
    static createReservation = (room) => (
        ReservationActions.book(room, statuses.PENDING)
    )

    static confirmReservation = (room, time) => (
        ReservationActions.update(room, time, statuses.CONFIRMED)
    )

    static update(room, time, status) {
        const updateFailure = (error) => {
            return {
                type: reservationConstants.UPDATE_FAILURE,
                payload: {
                    error
                }
            };
        };
        const updateSuccess = () => {
            return {
                type: reservationConstants.UPDATE_SUCCESS
            };
        };
        const updateRequest = (reservation) => {
            return {
                type: reservationConstants.UPDATE_REQUEST,
                payload: {
                    reservation
                }
            };
        };

        return (dispatch, stateAccessor) => {
            let {
                reservation,
                totalCost
            } = stateAccessor().reservations;

            const {
                values
            } = stateAccessor().form.bookingForm;
            const guestName = (values) ? values.name : null;

            reservation = {
                ...reservation,
                status,
                totalCost,
                guestName,
                moveInTime: MomentExtensions.formatTime(time)
            };

            dispatch(updateRequest(reservation));
            RoomService.updateReservation(reservation)
                .then(handleError)
                .then(dispatch(updateSuccess(reservation)))
                .catch(error => dispatch(updateFailure(error)));
        }
    }

    static book(room, status) {
        const roomId = room.id;

        const bookFailure = (id, error) => {
            return {
                type: reservationConstants.BOOK_FAILURE,
                payload: {
                    id,
                    error
                }
            };
        };
        const bookSuccess = (reservation) => {
            return {
                type: reservationConstants.BOOK_SUCCESS,
                payload: {
                    reservation
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
                status: status
            };

            if (moveInDate && moveOutDate) {
                reservation.moveInDate = moveInDate.format(dateFormats.CREATION_TIME_FORMAT);
                reservation.moveOutDate = moveOutDate.format(dateFormats.CREATION_TIME_FORMAT);

                const stayDuration = moment
                    .duration(moveOutDate.diff(moveInDate))
                    .asDays();

                reservation.totalCost = (stayDuration + 1) * room.cost;
            }

            dispatch(bookRequest(roomId));
            RoomService.bookRoom(reservation)
                .then(handleError)
                .then(result => result.json())
                .then(jsonInfo => {
                    dispatch(bookSuccess(jsonInfo));
                    return jsonInfo;
                })
                .catch(error => dispatch(bookFailure(roomId, error)));
        }
    }

    static addService(service) {
        const addRequest = (service) => {
            return {
                type: reservationConstants.ADD_SERVICE,
                payload: {
                    service
                }
            };
        }

        return dispatch => {
            dispatch(addRequest(service));
        }
    }

    static removeService(service) {
        const addRequest = (service) => {
            return {
                type: reservationConstants.REMOVE_SERVICE,
                payload: {
                    service
                }
            };
        }

        return dispatch => {
            dispatch(addRequest(service));
        }
    }

    static getServices(id) {
        const getFailure = (error) => {
            return {
                type: reservationConstants.GET_SERVICES_FAILURE,
                payload: {
                    error
                }
            };
        };
        const getSuccess = (services) => {
            return {
                type: reservationConstants.GET_SERVICES_SUCCESS,
                payload: {
                    services
                }
            };
        };
        const getRequest = () => {
            return {
                type: reservationConstants.GET_SERVICES_REQUEST,
                payload: {}
            };
        };

        return dispatch => {
            dispatch(getRequest());
            RoomService.getServices(id)
                .then(handleError)
                .then(result => result.json())
                .then(jsonInfo => {
                    dispatch(getSuccess(jsonInfo));
                    return jsonInfo;
                })
                .catch(error => dispatch(getFailure(error)));
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