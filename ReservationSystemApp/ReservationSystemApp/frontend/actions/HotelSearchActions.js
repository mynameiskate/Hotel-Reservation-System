import {
    searchConstants
} from '../constants/searchConstants.js';
import HotelService from '../services/HotelService.js';
import QueryService from '../services/QueryService.js';

class HotelSearchActions {
    static loadFromQuery(query) {
        const getRequest = () => {
            return {
                type: searchConstants.GET_HOTELS_REQUEST,
                payload: {}
            }
        };
        const getSuccess = (info, page, filters) => {
            return {
                type: searchConstants.GET_HOTELS_SUCCESS,
                payload: {
                    info,
                    page,
                    filters
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
            const searchParams = QueryService.getParams(query);
            const {
                page,
                ...filters
            } = searchParams;
            dispatch(getRequest());
            HotelService.getHotelPage(page, filters)
                .then(handleError)
                .then(result => result.json())
                .then(jsonInfo => {
                    dispatch(getSuccess(jsonInfo, page, filters));
                    return jsonInfo;
                })
                .catch(error => dispatch(getFailure(error)));
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