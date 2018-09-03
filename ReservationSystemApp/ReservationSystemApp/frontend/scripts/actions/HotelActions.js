﻿import {
    hotelConstants
} from '../constants/hotelConstants';
import HotelService from '../services/HotelService';
import HotelSearchActions from './HotelSearchActions';
import FileActions from './FileActions';
import {
    links
} from '../config/links';
import {
    history
} from '../store/store';
import {
    toastr
} from 'react-redux-toastr'

class HotelActions {
    static resetHotelInfo() {
        const resetRequest = () => {
            return {
                type: hotelConstants.RESET_HOTEL_INFO
            }
        }

        return dispatch => {
            dispatch(resetRequest());
        }
    }

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

    static getHotelLocations(all = false) {
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
            HotelService.getHotelLocations(all)
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
                            dispatch(FileActions.setImages(info.entities[0].imageIds));
                        }
                        return info;
                    })
                    .catch(error => dispatch(showFailure(error)));
            }
        }
    }

    static createHotel() {
        const createFailure = (error) => {
            return {
                type: hotelConstants.CREATE_HOTEL_FAILURE,
                payload: {
                    error
                }
            };
        };
        const createSuccess = (hotel) => {
            return {
                type: hotelConstants.CREATE_HOTEL_SUCCESS,
                payload: {
                    hotel
                }
            };
        };
        const createRequest = (hotel) => {
            return {
                type: hotelConstants.CREATE_HOTEL_REQUEST,
                payload: {
                    hotel
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

            const {
                imageIds
            } = stateAccessor().files;

            const hotelModel = {
                name: hotelName,
                stars,
                location: {
                    cityId: selectedCity,
                    countryId: selectedCountry,
                    address
                },
                services,
                imageIds
            }

            dispatch(createRequest(hotelModel));
            HotelService.createHotel(hotelModel)
                .then(handleError)
                .then(result => result.json())
                .then(info => {
                    dispatch(createSuccess(info));
                    toastr.success("New hotel added.");
                    history.push(links.HOTEL_CREATION_PAGE);
                    return info;
                })
                .catch(error => {
                    dispatch(createFailure(error));
                    toastr.error("Hotel couldn't be added. Please, check input.");
                });
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

            const {
                services
            } = stateAccessor().reservations;

            const {
                imageIds
            } = stateAccessor().files;

            const hotelModel = {
                hotelId,
                name: hotelName,
                stars,
                location: {
                    cityId: selectedCity,
                    countryId: selectedCountry,
                    address
                },
                services,
                imageIds
            }

            dispatch(editRequest(hotelId, hotelModel));
            HotelService.update(hotelId, hotelModel)
                .then(handleError)
                .then(() => {
                    dispatch(editSuccess(hotelId));
                    toastr.success("Successfully updated.");
                    history.push(links.ADMIN_PAGE);
                })
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