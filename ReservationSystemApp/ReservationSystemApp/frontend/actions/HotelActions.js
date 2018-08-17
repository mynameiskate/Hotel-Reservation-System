﻿import {
    hotelConstants
} from '../constants/hotelConstants';
import HotelService from '../services/HotelService';
import HotelSearchActions from './HotelSearchActions';

class HotelActions {
    static resetFilter() {
        const resetRequest = () => {
            return {
                type: hotelConstants.RESET_FILTER,
                payload: {}
            }
        }

        return dispatch => {
            dispatch(resetRequest());
        }
    }

    static getLocations() {
        const getFailure = (error) => {
            return {
                type: hotelConstants.GET_LOCATIONS_FAILURE,
                payload: {
                    error
                }
            };
        };
        const getSuccess = (locations) => {
            return {
                type: hotelConstants.GET_LOCATIONS_SUCCESS,
                payload: {
                    locations
                }
            };
        };
        const getRequest = () => {
            return {
                type: hotelConstants.GET_LOCATIONS_REQUEST,
                payload: {}
            };
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

    static removeHotel(hotelId) {
        const removeFailure = (id, error) => {
            return {
                type: hotelConstants.REMOVE_HOTEL_FAILURE,
                payload: {
                    id,
                    error
                }
            };
        };
        const removeSuccess = (id) => {
            return {
                type: hotelConstants.REMOVE_HOTEL_SUCCESS,
                payload: {
                    id
                }
            };
        };
        const removeRequest = (id) => {
            return {
                type: hotelConstants.REMOVE_HOTEL_REQUEST,
                payload: {
                    id
                }
            };
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
            return {
                type: hotelConstants.SHOW_HOTEL_REQUEST,
                payload: {
                    id
                }
            };
        };
        const showSuccess = (loaded) => {
            return {
                type: hotelConstants.SHOW_HOTEL_SUCCESS,
                payload: {
                    loaded
                }
            };
        };
        const showFailure = (error) => {
            return {
                type: hotelConstants.SHOW_HOTEL_FAILURE,
                payload: {
                    error
                }
            };
        };

        return (dispatch, stateAccessor) => {
            const hotel = this.getHotelById(hotelId, stateAccessor().hotels.info);
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
                        if (info.entities) {
                            dispatch(HotelSearchActions.syncParamsWithInfo(info.entities[0]));
                        }
                        return info;
                    })
                    .catch(error => dispatch(showFailure(error)));
            }
        }
    }

    static hideHotel(hotelId) {
        const hideRequest = (id) => {
            return {
                type: hotelConstants.HIDE_HOTEL,
                payload: {
                    id
                }
            };
        };

        return dispatch => {
            dispatch(hideRequest(hotelId));
        }
    }

    static startEditing(hotelId, hotelInfo) {
        const showEditor = (id, selected) => {
            return {
                type: hotelConstants.START_EDITING,
                payload: {
                    id,
                    selected
                }
            };
        }

        return dispatch => {
            dispatch(showEditor(hotelId, hotelInfo));
        }
    }

    static stopEditing() {
        const hideEditor = () => {
            return {
                type: hotelConstants.STOP_EDITING,
                payload: {}
            };
        }

        return dispatch => {
            dispatch(hideEditor());
        }
    }

    static editHotel(hotelId) {
        const editFailure = (id, error) => {
            return {
                type: hotelConstants.EDIT_HOTEL_FAILURE,
                payload: {
                    id,
                    error
                }
            };
        };
        const editSuccess = (id) => {
            return {
                type: hotelConstants.EDIT_HOTEL_SUCCESS,
                payload: {
                    id
                }
            };
        };
        const editRequest = (id, hotelInfo) => {
            return {
                type: hotelConstants.EDIT_HOTEL_REQUEST,
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
            const hotelModel = {
                hotelId,
                name: hotelName,
                stars,
                location: {
                    cityId: selectedCity,
                    countryId: selectedCountry,
                    address
                }
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

export default HotelActions;