import { hotelConstants } from '../constants/hotelConstants.js';

export function hotelReducer (state = {}, action) {
    switch(action.type) {
        case hotelConstants.GET_HOTELS_SUCCESS:
            return {
                data: action.data          
            };
        case hotelConstants.GET_HOTELS_FAILURE:
            return {
                error: action.error
            };
        case hotelConstants.GET_HOTELS_REQUEST:
            return {
                isSent: true
            };

        default:
            return state;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    }
}