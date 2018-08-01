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

    static filterHotels(options) {
        const filterRequest = (options) => {
            return { type: hotelConstants.FILTER_HOTELS_REQUEST, payload: { options } }
        };
        const filterSuccess = (info) => {
            return { type: hotelConstants.FILTER_HOTELS_SUCCESS, payload: { info } };
        };
        const filterFailure = (error) => {
            return { type: hotelConstants.FILTER_HOTELS_FAILURE, payload: { error } };
        };

        return dispatch => {
            dispatch(filterRequest(options));
            HotelService.filterHotels(options)
                .then(handleError)
                .then(result => result.json())
                .then(jsonInfo => {
                    dispatch(filterSuccess(jsonInfo));
                    return jsonInfo;
                })
                .catch(error => dispatch(filterFailure(error)));
        }

    }

    static getHotelPage(id, filters) {
        const getRequest = (id, filters) => {
            return { type: hotelConstants.GET_HOTEL_PAGE_REQUEST, payload: { id, filters } }
        };
        const getSuccess = (info) => {
            return { type: hotelConstants.GET_HOTEL_PAGE_SUCCESS, payload: { info } };
        };
        const getFailure = (error) => {
            return { type: hotelConstants.GET_HOTEL_PAGE_FAILURE, payload: { error } };
        };

        return dispatch => {
            dispatch(getRequest(id, filters));
            HotelService.getHotelPage(id, filters)
                .then(handleError)
                .then(result => result.json())
                .then(jsonInfo => {
                    dispatch(getSuccess(jsonInfo));
                    return jsonInfo;
                })
                .catch(error => dispatch(getFailure(error)));
        }
    }

    static getLocations() {
        const getFailure = (error) => {
            return { type: hotelConstants.GET_LOCATIONS_FAILURE, payload: { error } };
        };
        const getSuccess = (locations) => {
            return { type: hotelConstants.GET_LOCATIONS_SUCCESS, payload: { locations } };
        };
        const getRequest = () => {
            return { type: hotelConstants.GET_LOCATIONS_REQUEST, payload: {} };
        };

        return dispatch => {
            dispatch(getRequest());
            HotelService.getLocations()
                .then(handleError)
                .then(result => result.json())
                .then(jsonInfo => {
                    dispatch(getSuccess(jsonInfo));
                    return jsonInfo;
                })
                .catch(error => dispatch(getFailure(error)));
        }
    }

    static setCurrentCountry(id, name) {
        const country = { id, name }
        const setRequest = (country) => {
            return { type: hotelConstants.SET_CURRENT_COUNTRY, payload: { selectedCountry: country } }
        };

        return dispatch => {
            dispatch(setRequest(country));
        }
    }

    static setCurrentCity(value) {
        const setRequest = (city) => {
            return { type: hotelConstants.SET_CURRENT_CITY, payload: { selectedCity: city } }
        };

        return dispatch => {
            dispatch(setRequest(value));
        }
    }

    static setCurrentPage(page) {
        const setRequest = (page) => {
            return { type: hotelConstants.SET_CURRENT_PAGE, payload: { currentPage: page } }
        };

        return dispatch => {
            dispatch(setRequest(page));
        }
    }

    static resetCurrentPage() {
        const resetRequest = (page) => {
            return { type: hotelConstants.RESET_CURRENT_PAGE, payload: {} }
        };

        return dispatch => {
            dispatch(resetRequest());
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
        if (hotels && hotels.count > 0) {
            return hotels.find(hotel => hotel.hotelId == id);
        } else {
            return null;
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