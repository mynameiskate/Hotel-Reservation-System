import {
    roomConstants
} from '../constants/roomConstants.js';

import RoomService from '../services/RoomService';

class RoomActions {
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
                    error
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
                type: roomConstants.SET_CURRENT_PAGE,
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

    static bookRoom(roomId) {
        const bookFailure = (id, error) => {
            return {
                type: roomConstants.BOOK_FAILURE,
                payload: {
                    id,
                    error
                }
            };
        };
        const bookSuccess = (id) => {
            return {
                type: roomConstants.BOOK_SUCCESS,
                payload: {
                    id
                }
            };
        };
        const bookRequest = (id) => {
            return {
                type: roomConstants.BOOK_REQUEST,
                payload: {
                    id
                }
            };
        };

        return dispatch => {
            dispatch(bookRequest(roomId));
            RoomService.book(roomId)
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

export default RoomActions;