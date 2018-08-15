import queryString from 'query-string';
import moment from 'moment';
import {
    change
} from 'redux-form';

import {
    dateFormats
} from '../constants/dateFormats';
import MomentExtensions from '../extensions/MomentExtensions';
import {
    searchConstants
} from '../constants/searchConstants';
import HotelService from '../services/HotelService';
import HistoryActions from '../actions/HistoryActions';
import RoomActions from '../actions/RoomActions';

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
                type: searchConstants.SET_CURRENT_HOTEL_PAGE,
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

    static setMoveInDate(date) {
        const setRequest = (date) => {
            return {
                type: searchConstants.SET_START_DATE,
                payload: {
                    moveInDate: date
                }
            }
        }

        return dispatch => {
            dispatch(setRequest(date));
        }
    }

    static setDateFailure() {
        const setFailure = () => {
            return {
                type: searchConstants.INCORRECT_DATE_ERROR,
                payload: {
                    dateError: 'Incorrect date interval!'
                }
            }
        }

        return (dispatch) => {
            dispatch(setFailure());
        }

    }

    static setMoveOutDate(date) {
        const setRequest = (date) => {
            return {
                type: searchConstants.SET_END_DATE,
                payload: {
                    moveOutDate: date
                }
            }
        }

        return (dispatch) => {
            dispatch(setRequest(date));
        }
    }

    static buildQuery = (link, selectedCountry, selectedCity,
        hotelName, moveInDate, moveOutDate, adults, page = 1) => {
        const params = {
            page
        };

        if (selectedCountry) {
            params.countryId = selectedCountry;
        }

        if (selectedCity) {
            params.cityId = selectedCity;
        }

        if (hotelName) {
            params.name = hotelName;
        }

        if (adults) {
            params.adults = adults;
        }

        const paramMoveInDate = (moveInDate) || moment();
        params.moveInDate = paramMoveInDate.format(dateFormats.REQUEST_DATE_FORMAT);

        const paramMoveOutDate = (moveOutDate) || moment().add(1, 'day').endOf('day');
        params.moveOutDate = paramMoveOutDate.format(dateFormats.REQUEST_DATE_FORMAT);

        const query = queryString.stringify(params);
        return dispatch => {

            if (!paramMoveOutDate.isBefore(paramMoveInDate)) {
                params.moveOutDate = paramMoveOutDate.format(dateFormats.REQUEST_DATE_FORMAT);
                dispatch(HistoryActions.pushUrl(link, query));
            } else {
                dispatch(HotelSearchActions.setDateFailure(moveOutDate));
            }
        }
    }

    static addRequiredParamsToQuery(link, query) {
        const params = queryString.parse(query);
        if (!params.moveInDate) {
            const moveInDate = moment();
            const moveOutDate = moment().add(1, 'day').endOf('day');
            params.moveInDate = moveInDate.format(dateFormats.REQUEST_DATE_FORMAT);
            params.moveOutDate = moveOutDate.format(dateFormats.REQUEST_DATE_FORMAT);
        }
        return dispatch => {
            dispatch(HistoryActions.pushUrl(link, queryString.stringify(params)));
        }
    }

    static syncParamsWithQuery(query) {
        const params = queryString.parse(query);
        const paramMoveInDate = MomentExtensions.stringToMoment(params.moveInDate);
        const paramMoveOutDate = MomentExtensions.stringToMoment(params.moveOutDate);

        return (dispatch, stateAccessor) => {
            const {
                selectedCountry,
                selectedCity,
                page,
                hotelName,
                moveInDate,
                moveOutDate
            } = stateAccessor().search;
            const {
                adults
            } = stateAccessor().rooms;

            if (selectedCountry !== params.countryId) {
                dispatch(HotelSearchActions.setCurrentCountry(params.countryId));
            }

            if (selectedCity !== params.cityId) {
                dispatch(HotelSearchActions.setCurrentCity(params.cityId));
            }

            if (params.page && page !== params.page) {
                dispatch(HotelSearchActions.setCurrentPage(params.page));
            }

            if (hotelName != params.name) {
                dispatch(HotelSearchActions.setCurrentHotelName(params.name));
                dispatch(change('searchFilterForm', 'name', params.name || ''));
            }

            if (adults != params.adults) {
                dispatch(RoomActions.setAdults(params.adults));
            }

            if (paramMoveInDate && !paramMoveInDate.isSame(moveInDate)) {
                dispatch(HotelSearchActions.setMoveInDate(paramMoveInDate));
            }

            if (paramMoveOutDate && !paramMoveOutDate.isSame(moveOutDate)) {
                dispatch(HotelSearchActions.setMoveOutDate(paramMoveOutDate));
            }
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