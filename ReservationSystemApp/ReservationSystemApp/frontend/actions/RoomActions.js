import queryString from 'query-string';
import { push } from 'connected-react-router';
import moment from 'moment';

import {
    roomConstants
} from '../constants/roomConstants.js';
import HotelSearchActions from './HotelSearchActions.js';
import RoomService from '../services/RoomService';
import HelperActions from './HelperActions.js';

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

    static syncParamsWithQuery(query, props) {
        const params = queryString.parse(query);
        const moveInDate = HelperActions.stringToMoment(params.moveInDate);
        const moveOutDate = HelperActions.stringToMoment(params.moveOutDate);

        return (dispatch) => {
            if (moveInDate && !moveInDate.isSame(props.moveInDate)) {
                dispatch(HotelSearchActions.setMoveInDate(moveInDate));
            }

            if (moveOutDate && !moveOutDate.isSame(props.moveOutDate))  {
                dispatch(HotelSearchActions.setMoveOutDate(moveOutDate));
            }

            if (params.page && props.page !== params.page) {
                dispatch(RoomActions.setCurrentPage(params.page));
            }

            if (params.adults && props.adults !== params.adults) {
                dispatch(RoomActions.setAdults(params.adults));
            }
        }
    }

    static buildQuery = (link, moveInDate, moveOutDate, adults, page = 1) => {
        const params = {
            page
        };

        if (moveInDate) {
            params.moveInDate =  moveInDate.format('YYYY/MM/DD');
        }

        if (moveOutDate) {
            params.moveOutDate = moveOutDate.format('YYYY/MM/DD');
        }

        if (adults) {
            params.adults = adults;
        }

        const query = queryString.stringify(params);
        return dispatch => {
            dispatch(HelperActions.pushUrl(link, query));
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