﻿import { hotelConstants } from '../constants/hotelConstants.js';
import { hotelServices } from '../services/hotelService.js';

export const hotelActions = {
    findAll,
    removeHotel,
    editHotel,
    showHotel,
    hideHotel,
    startEditing,
    stopEditing
}

function findAll() {
    const sendRequest = () => { return { type: hotelConstants.GET_HOTELS_REQUEST } };
    const receiveData = (info) => { return { type: hotelConstants.GET_HOTELS_SUCCESS, payload: { info } }; };
    const failToFind = (error) => { return { type: hotelConstants.GET_HOTELS_FAILURE, payload: { error } }; };

    return (dispatch, stateAccessor) => {
        dispatch(sendRequest());
        hotelServices.getAll()
            .then(handleError)
            .then(result => result.json())
            .then(jsonInfo => {
                dispatch(receiveData(jsonInfo));
                return jsonInfo;
            })
            .catch(error => dispatch(failToFind(error)));
    }
}

function removeHotel(hotelId) {
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
        hotelServices.remove(hotelId)
            .then(handleError)
            .then(dispatch(removeSuccess(hotelId)))
            .catch(error => dispatch(removeFailure(hotelId, error)));
    }
}

function getHotelById(id, hotels) {
    if (hotels) {
        return hotels.find(hotel => hotel.hotelId == id);
    }
}

function showHotel(hotelId) {
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
        let hotel = getHotelById(hotelId, stateAccessor().hotels.info);
        if (hotel) {
            dispatch(showSuccess(hotel));
            return hotel;
        } else {
            dispatch(showRequest(hotelId));
            hotelServices.getHotel(hotelId)
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

function hideHotel(hotelId) {
    const hideRequest = (id) => { return { type: hotelConstants.HIDE_HOTEL, payload: { id } }; };

    return dispatch => {
        dispatch(hideRequest(hotelId));
    }
}

function startEditing(hotelId, hotelInfo) {
    const showEditor = (id, selected) => {
        return { type: hotelConstants.START_EDITING, payload: { id, selected } };
    }

    return dispatch => {
        dispatch(showEditor(hotelId, hotelInfo));
    }
}

function stopEditing() {
    const hideEditor = () => {
        return { type: hotelConstants.STOP_EDITING, payload: {} };
    }

    return dispatch => {
        dispatch(hideEditor());
    }
}

function editHotel(hotelId, hotelInfo) {
    const editFailure = (id, error) => {
        return { type: hotelConstants.EDIT_HOTEL_FAILURE, payload: { id, error } };
    };
    const editSuccess = (id) => { return { type: hotelConstants.EDIT_HOTEL_SUCCESS, payload: { id } }; };
    const editRequest = (id, hotelInfo) => { return { type: hotelConstants.EDIT_HOTEL_REQUEST, payload: { id, hotelInfo } }; };

    return dispatch => {
        dispatch(editRequest(hotelId, hotelInfo));
        hotelServices.update(hotelId, hotelInfo)
            .then(handleError)
            .then(dispatch(editSuccess(hotelId)))
            .catch(error => dispatch(editFailure(hotelId, error)));
    }
}

function handleError(response) {
    if (!response.ok) {
        throw Error(response.status)
    }
    return response;
}