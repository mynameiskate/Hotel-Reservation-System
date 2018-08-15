import queryString from 'query-string';

import {
    roomConstants
} from '../constants/roomConstants';
import MomentExtensions from '../extensions/MomentExtensions';
import HotelSearchActions from './HotelSearchActions';
import RoomService from '../services/RoomService';
import HistoryActions from './HistoryActions';

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
                    error: error || null
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
                type: roomConstants.SET_CURRENT_ROOM_PAGE,
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

    static syncParamsWithQuery(query) {
        const params = queryString.parse(query);
        const paramMoveInDate = MomentExtensions.stringToMoment(params.moveInDate);
        const paramMoveOutDate = MomentExtensions.stringToMoment(params.moveOutDate);

        return (dispatch, stateAccessor) => {
            const {
                page,
                adults
            } = stateAccessor().rooms;
            const {
                moveInDate,
                moveOutDate
            } = stateAccessor().search;

            if (paramMoveInDate && !paramMoveInDate.isSame(moveInDate)) {
                dispatch(HotelSearchActions.setMoveInDate(paramMoveInDate));
            }

            if (paramMoveOutDate && !paramMoveOutDate.isSame(moveOutDate)) {
                dispatch(HotelSearchActions.setMoveOutDate(paramMoveOutDate));
            }

            if (params.page && page !== params.page) {
                dispatch(RoomActions.setCurrentPage(params.page));
            }

            if (params.adults && adults !== params.adults) {
                dispatch(RoomActions.setAdults(params.adults));
            }
        }
    }

    static buildQuery = (link, moveInDate, moveOutDate, adults, page = 1) => {
        const query = HistoryActions.getQuery(moveInDate, moveOutDate, adults, page);
        return dispatch => {
            dispatch(HistoryActions.pushUrl(link, query));
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