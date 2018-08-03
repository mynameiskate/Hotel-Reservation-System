import {
    searchConstants
} from '../constants/searchConstants.js';
import HotelService from '../services/HotelService.js';

class HotelSearchActions {
    static loadFromQuery(query) {
        const getRequest = () => {
            return {
                type: searchConstants.GET_HOTELS_REQUEST,
                payload: {}
            }
        };
        const getSuccess = (info) => {
            return {
                type: searchConstants.GET_HOTELS_SUCCESS,
                payload: {
                    info
                }
            };
        };
        const getFailure = (error) => {
            return {
                type: searchConstants.GET_HOTELS_FAILURE,
                payload: {
                    error
                }
            };
        };

        return (dispatch) => {
            dispatch(getRequest());
            HotelService.getHotelPageWithQuery(query)
                .then(handleError)
                .then(result => result.json())
                .then(jsonInfo => {
                    dispatch(getSuccess(jsonInfo));
                    return jsonInfo;
                })
                .catch(error => dispatch(getFailure(error)));
        }
    }

    static setCurrentCountry(country) {
        const setRequest = (country) => {
            return {
                type: searchConstants.SET_CURRENT_COUNTRY,
                payload: {
                    selectedCountry: country
                }
            }
        };

        return dispatch => {
            dispatch(setRequest(country));
        }
    }

    static setCurrentPage(page) {
        const setRequest = (page) => {
            return {
                type: searchConstants.SET_CURRENT_PAGE,
                payload: {
                    currentPage: page
                }
            }
        };

        return dispatch => {
            dispatch(setRequest(page));
        }
    }

    static setCurrentCity(city) {
        const setRequest = (city) => {
            return {
                type: searchConstants.SET_CURRENT_CITY,
                payload: {
                    selectedCity: city
                }
            }
        };

        return dispatch => {
            dispatch(setRequest(city));
        }
    }

    static setCurrentHotelName(name) {
        const setRequest = (name) => {
            return {
                type: searchConstants.SET_CURRENT_HOTEL_NAME,
                payload: {
                    hotelName: name
                }
            }
        };

        return dispatch => {
            dispatch(setRequest(name));
        }
    }
}


let handleError = function(response) {
    if (!response.ok) {
        throw Error(response.status)
    }
    return response;
}

export default HotelSearchActions;