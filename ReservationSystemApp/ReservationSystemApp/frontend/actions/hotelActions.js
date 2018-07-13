import { hotelConstants } from '../constants/hotelConstants.js';
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

    return dispatch => {
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
    const removeFailure = (id, error) => { return { type: hotelConstants.REMOVE_HOTEL_FAILURE, payload: { id, error } }; };
    const removeSuccess = (id) => { return { type: hotelConstants.REMOVE_HOTEL_SUCCESS, payload: { id } }; };
    const removeRequest = (id) => { return { type: hotelConstants.REMOVE_HOTEL_REQUEST, payload: { id } }; };

    return dispatch => {
        dispatch(removeRequest(hotelId));
        hotelServices.remove(hotelId)
            .then(handleError)
            .then(dispatch(removeSuccess(hotelId)))
            .catch(error => dispatch(removeFailure(hotelId, error)));
    }
}

function showHotel(hotelInfo) {
    const showRequest = (info) => { return { type: hotelConstants.SHOW_HOTEL, payload: { info } }; };

    return dispatch => {
        dispatch(showRequest(hotelInfo))
    }
}

function hideHotel(hotelId) {
    const hideRequest = (id) => { return { type: hotelConstants.HIDE_HOTEL, payload: { id } }; };

    return dispatch => {
        dispatch(hideRequest(hotelId))
    }
}

function startEditing(hotelId, hotelInfo) {
    const showEditor = (id, info) => { return { type: hotelConstants.START_EDITING, payload: { id, info } }; }

    dispatch(showEditor(hotelId, hotelInfo));
}

function stopEditing(hotelId, hotelInfo) {
    const hideEditor = (id, info) => { return { type: hotelConstants.STOP_EDITING, payload: { id, info } }; }

    dispatch(hideEditor(hotelId, hotelInfo));
}

function editHotel(hotelId, hotelInfo) {
    const editFailure = (id, error) => { return { type: hotelConstants.EDIT_HOTEL_FAILURE, payload: { id, error } }; };
    const editSuccess = (id) => { return { type: hotelConstants.EDIT_HOTEL_SUCCESS, payload: { id } }; };
    const editRequest = (id) => { return { type: hotelConstants.EDIT_HOTEL_REQUEST, payload: { id } }; };

    dispatch(editRequest(hotelId));
    hotelServices.update(hotelId, hotelInfo)
        .then(handleError)
        .then(dispatch(editSuccess(hotelId)))
        .catch(error => dispatch(editFailure(hotelId, error)));
}

function handleError(response) {
    if (!response.ok) {
        throw Error(response.status)
    }
    return response;
}