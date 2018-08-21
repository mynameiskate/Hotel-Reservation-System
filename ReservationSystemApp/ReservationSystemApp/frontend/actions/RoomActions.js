import queryString from 'query-string';
import {
    change
} from 'redux-form';

import {
    roomConstants
} from '../constants/roomConstants';
import MomentExtensions from '../extensions/MomentExtensions';
import HotelSearchActions from './HotelSearchActions';
import RoomService from '../services/RoomService';
import HistoryActions from './HistoryActions';

class RoomActions {
    static getHotelRoom(hotelId, roomId) {
        const getRequest = () => {
            return {
                type: roomConstants.GET_ROOM_REQUEST,
                payload: {
                    hotelId,
                    roomId
                }
            }
        };
        const getSuccess = (roomInfo) => {
            return {
                type: roomConstants.GET_ROOM_SUCCESS,
                payload: {
                    roomInfo
                }
            };
        };
        const getFailure = (error) => {
            return {
                type: roomConstants.GET_ROOM_FAILURE,
                payload: {
                    error: error || null
                }
            };
        };

        return (dispatch) => {
            dispatch(getRequest());
            RoomService.getHotelRoom(hotelId, roomId)
                .then(handleError)
                .then(result => result.json())
                .then(jsonInfo => {
                    dispatch(getSuccess(jsonInfo));
                    if (jsonInfo.entities) {
                        dispatch(this.syncParamsWithInfo(jsonInfo.entities[0]))
                    }
                    return jsonInfo;
                })
                .catch(error => dispatch(getFailure(error)));
        }
    }

    static syncParamsWithInfo(room) {
        const {
            cost,
            adults
        } = room;
        return (dispatch) => {
            dispatch(RoomActions.setAdults(adults));

            dispatch(RoomActions.setCost(cost));
            dispatch(change('roomEditForm', 'cost', cost || ''));
        }
    }

    static loadFromQuery(id, query) {
        const getRequest = () => {
            return {
                type: roomConstants.GET_ROOMS_REQUEST,
                payload: {}
            }
        };
        const getSuccess = (info) => {
            return {
                type: roomConstants.GET_ROOMS_SUCCESS,
                payload: {
                    info
                }
            };
        };
        const getFailure = (error) => {
            return {
                type: roomConstants.GET_ROOMS_FAILURE,
                payload: {
                    error: error || null
                }
            };
        };

        return (dispatch) => {
            dispatch(getRequest());
            RoomService.getRoomPageWithQuery(id, query)
                .then(handleError)
                .then(result => result.json())
                .then(jsonInfo => {
                    dispatch(getSuccess(jsonInfo));
                    return jsonInfo;
                })
                .catch(error => dispatch(getFailure(error)));
        }
    }

    static setCurrentPage(page) {
        const setRequest = (page) => {
            return {
                type: roomConstants.SET_CURRENT_ROOM_PAGE,
                payload: {
                    currentPage: page
                }
            }
        };

        return dispatch => {
            dispatch(setRequest(page));
        }
    }

    static setAdults(adults) {
        const setRequest = (adults) => {
            return {
                type: roomConstants.SET_ADULTS,
                payload: {
                    adults
                }
            }
        };

        return dispatch => {
            dispatch(setRequest(adults));
        }
    }

    static setCost(cost) {
        const setRequest = (cost) => {
            return {
                type: roomConstants.SET_ROOM_COST,
                payload: {
                    cost
                }
            }
        };

        return dispatch => {
            dispatch(setRequest(cost));
            dispatch(change('roomEditForm', 'cost', cost || ''));
        }
    }

    static setRoomAvailability() {
        const setRequest = () => {
            return {
                type: roomConstants.SET_AVAILABILITY,
                payload: {}
            }
        };

        return dispatch => {
            dispatch(setRequest());
        }
    }

    static syncParamsWithQuery(query) {
        const params = queryString.parse(query);
        const paramMoveInDate = MomentExtensions.stringToMoment(params.moveInDate);
        const paramMoveOutDate = MomentExtensions.stringToMoment(params.moveOutDate);

        return (dispatch, stateAccessor) => {
            const {
                page,
                adults
            } = stateAccessor().rooms;
            const {
                moveInDate,
                moveOutDate
            } = stateAccessor().search;

            if (paramMoveInDate && !paramMoveInDate.isSame(moveInDate)) {
                dispatch(HotelSearchActions.setMoveInDate(paramMoveInDate));
            }

            if (paramMoveOutDate && !paramMoveOutDate.isSame(moveOutDate)) {
                dispatch(HotelSearchActions.setMoveOutDate(paramMoveOutDate));
            }

            if (params.page && page !== params.page) {
                dispatch(RoomActions.setCurrentPage(params.page));
            }

            if (params.adults && adults !== params.adults) {
                dispatch(RoomActions.setAdults(params.adults));
            }
        }
    }

    static buildQuery = (link, moveInDate, moveOutDate, adults, page = 1) => {
        const query = HistoryActions.getQuery(moveInDate, moveOutDate, adults, page);
        return dispatch => {
            dispatch(HistoryActions.pushUrl(link, query));
        }
    }

    static editRoom(roomId) {
        const editFailure = (id, error) => {
            return {
                type: roomConstants.EDIT_ROOM_FAILURE,
                payload: {
                    id,
                    error
                }
            };
        };
        const editSuccess = (id) => {
            return {
                type: roomConstants.EDIT_ROOM_SUCCESS,
                payload: {
                    id
                }
            };
        };
        const editRequest = (id, hotelInfo) => {
            return {
                type: roomConstants.EDIT_ROOM_REQUEST,
                payload: {
                    id,
                    hotelInfo
                }
            };
        };

        return (dispatch, stateAccessor) => {
            const {
                hotelName,
                stars,
                selectedCity,
                selectedCountry,
                address
            } = stateAccessor().search;
            const {
                services
            } = stateAccessor().reservations;
            const hotelModel = {
                hotelId,
                name: hotelName,
                stars,
                location: {
                    cityId: selectedCity,
                    countryId: selectedCountry,
                    address
                },
                services
            }

            dispatch(editRequest(hotelId, hotelModel));
            HotelService.update(hotelId, hotelModel)
                .then(handleError)
                .then(dispatch(editSuccess(hotelId)))
                .catch(error => dispatch(editFailure(hotelId, error)));
        }
    }
}

let handleError = function(response) {
    if (!response.ok) {
        throw Error(response.status)
    }
    return response;
}

export default RoomActions;