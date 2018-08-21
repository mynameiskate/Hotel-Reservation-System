import moment from 'moment';

import {
    reservationConstants
} from '../constants/reservationConstants';
import RoomService from '../services/RoomService';
import HotelService from '../services/HotelService';
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

    static confirmReservation = (time) => (
        ReservationActions.update(time, statuses.CONFIRMED)
    )

    static cancelReservation = () => (
        ReservationActions.update(null, statuses.CANCELLED)
    )

    static update(time, status) {
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
                moveInTime: time ? MomentExtensions.formatTime(time) : null,
                confirmed: moment().format(dateFormats.CREATION_TIME_FORMAT)
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

    static createNewService(hotelId, service) {
        const createFailure = (error) => {
            return {
                type: reservationConstants.CREATE_NEW_SERVICE_FAILURE,
                payload: {
                    error
                }
            };
        };
        const createSuccess = (service) => {
            return {
                type: reservationConstants.ADD_SERVICE,
                payload: {
                    service
                }
            };
        };
        const createRequest = (service) => {
            return {
                type: reservationConstants.CREATE_NEW_SERVICE_REQUEST,
                payload: {
                    service
                }
            };
        };

        return (dispatch) => {
            dispatch(createRequest(service));
            HotelService.createNewService(hotelId, service)
                .then(handleError)
                .then(result => result.json())
                .then(jsonInfo => {
                    dispatch(createSuccess(jsonInfo));
                    return jsonInfo;
                })
                .catch(error => dispatch(createFailure(error)))
                .then(dispatch(ReservationActions.getServices(hotelId)));
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

    static updatePossibleServices(serviceId) {
        const updateRequest = (serviceId) => {
            return {
                type: reservationConstants.UPDATE_POSSIBLE_SERVICES,
                payload: {
                    serviceId
                }
            };
        }

        return dispatch => {
            dispatch(updateRequest(serviceId));
        }

    }

    static addHotelService(service) {
        const addRequest = (service) => {
            return {
                type: reservationConstants.ADD_HOTEL_SERVICE,
                payload: {
                    service
                }
            };
        }

        return dispatch => {
            dispatch(addRequest(service));
        }
    }

    static removeHotelService(id) {
        const removeRequest = (id) => {
            return {
                type: reservationConstants.REMOVE_HOTEL_SERVICE,
                payload: {
                    id
                }
            };
        }

        return dispatch => {
            dispatch(removeRequest(id));
        }
    }

    static chooseNewService(service) {
        const chooseRequest = (service) => {
            return {
                type: reservationConstants.CHOOSE_NEW_SERVICE,
                payload: {
                    service
                }
            };
        }

        return dispatch => {
            dispatch(chooseRequest(service));
        }
    }

    static addNewServiceCost(cost) {
        const addRequest = (cost) => {
            return {
                type: reservationConstants.ADD_NEW_SERVICE_COST,
                payload: {
                    cost
                }
            };
        }

        return dispatch => {
            dispatch(addRequest(cost));
        }
    }

    static updateHotelServiceCost(id, cost) {
        const updateRequest = (id, cost) => {
            return {
                type: reservationConstants.UPDATE_HOTEL_SERVICE_COST,
                payload: {
                    id,
                    cost
                }
            };
        }

        return dispatch => {
            dispatch(updateRequest(id, cost));
        }
    }

    static setCurrentRoom(room) {
        const setRequest = (room) => {
            return {
                type: reservationConstants.SET_CURRENT_ROOM,
                payload: {
                    room
                }
            }
        }

        return dispatch => {
            dispatch(setRequest(room));
        }
    }

    static setMoveInTime(moveInTime) {
        const setRequest = (moveInTime) => {
            return {
                type: reservationConstants.SET_MOVE_IN_TIME,
                payload: {
                    moveInTime
                }
            }
        }

        return dispatch => {
            dispatch(setRequest(moveInTime));
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

    static getPossibleServices() {
        const getFailure = (error) => {
            return {
                type: reservationConstants.GET_POSSIBLE_SERVICES_FAILURE,
                payload: {
                    error
                }
            };
        };
        const getSuccess = (services) => {
            return {
                type: reservationConstants.GET_POSSIBLE_SERVICES_SUCCESS,
                payload: {
                    services
                }
            };
        };
        const getRequest = () => {
            return {
                type: reservationConstants.GET_POSSIBLE_SERVICES_SUCCESS,
                payload: {}
            };
        };

        return dispatch => {
            dispatch(getRequest());
            RoomService.getPossibleServices()
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