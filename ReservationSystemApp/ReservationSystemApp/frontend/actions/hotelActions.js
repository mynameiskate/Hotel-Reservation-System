﻿import { hotelConstants } from '../constants/hotelConstants.js';
import HotelService from '../services/HotelService.js';

class HotelActions {
    static findAll(refresh = true) {
        const sendRequest = () => { return { type: hotelConstants.GET_HOTELS_REQUEST } };
        const receiveData = (info) => { return { type: hotelConstants.GET_HOTELS_SUCCESS, payload: { info } }; };
        const failToFind = (error) => { return { type: hotelConstants.GET_HOTELS_FAILURE, payload: { error } }; };

        return (dispatch, stateAccessor) => {
            let hotels = stateAccessor().hotels.info;
            if (hotels && !refresh) {
                dispatch(receiveData(hotels));
            } else {
                dispatch(sendRequest());
                HotelService.getAll()
                    .then(handleError)
                    .then(result => result.json())
                    .then(jsonInfo => {
                        dispatch(receiveData(jsonInfo));
                        return jsonInfo;
                    })
                    .catch(error => dispatch(failToFind(error)));
            }
        }
    }

    static removeHotel(hotelId) {
        const removeFailure = (id, error) => {
            return { type: hotelConstants.REMOVE_HOTEL_FAILURE, payload: { id, error } };
        };
        const removeSuccess = (id) => {
            return { type: hotelConstants.REMOVE_HOTEL_SUCCESS, payload: { id } };
        };
        const removeRequest = (id) => {
            return { type: hotelConstants.REMOVE_HOTEL_REQUEST, payload: { id } };
        };

        return dispatch => {
            dispatch(removeRequest(hotelId));
            HotelService.remove(hotelId)
                .then(handleError)
                .then(dispatch(removeSuccess(hotelId)))
                .catch(error => dispatch(removeFailure(hotelId, error)));
        }
    }

    static getHotelById(id, hotels) {
        if (hotels) {
            return hotels.find(hotel => hotel.hotelId == id);
        }
    }

    static showHotel(hotelId) {
        const showRequest = (id) => {
            return { type: hotelConstants.SHOW_HOTEL_REQUEST, payload: { id } };
        };
        const showSuccess = (loaded) => {
            return { type: hotelConstants.SHOW_HOTEL_SUCCESS, payload: { loaded } };
        };
        const showFailure = (error) => {
            return { type: hotelConstants.SHOW_HOTEL_FAILURE, payload: { error } };
        };

        return (dispatch, stateAccessor) => {
            let hotel = this.getHotelById(hotelId, stateAccessor().hotels.info);
            if (hotel) {
                dispatch(showSuccess(hotel));
                return hotel;
            } else {
                dispatch(showRequest(hotelId));
                HotelService.getHotel(hotelId)
                    .then(handleError)
                    .then(result => result.json())
                    .then(info => {
                        dispatch(showSuccess(info));
                        return info;
                    })
                    .catch(error => dispatch(showFailure(error)));
            }
        }
    }

    static hideHotel(hotelId) {
        const hideRequest = (id) => { return { type: hotelConstants.HIDE_HOTEL, payload: { id } }; };

        return dispatch => {
            dispatch(hideRequest(hotelId));
        }
    }

    static startEditing(hotelId, hotelInfo) {
        const showEditor = (id, selected) => {
            return { type: hotelConstants.START_EDITING, payload: { id, selected } };
        }

        return dispatch => {
            dispatch(showEditor(hotelId, hotelInfo));
        }
    }

    static stopEditing() {
        const hideEditor = () => {
            return { type: hotelConstants.STOP_EDITING, payload: {} };
        }

        return dispatch => {
            dispatch(hideEditor());
        }
    }

    static editHotel(hotelId, hotelInfo) {
        const editFailure = (id, error) => {
            return { type: hotelConstants.EDIT_HOTEL_FAILURE, payload: { id, error } };
        };
        const editSuccess = (id) => { return { type: hotelConstants.EDIT_HOTEL_SUCCESS, payload: { id } }; };
        const editRequest = (id, hotelInfo) => { return { type: hotelConstants.EDIT_HOTEL_REQUEST, payload: { id, hotelInfo } }; };

        return dispatch => {
            dispatch(editRequest(hotelId, hotelInfo));
            HotelService.update(hotelId, hotelInfo)
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

export default HotelActions;