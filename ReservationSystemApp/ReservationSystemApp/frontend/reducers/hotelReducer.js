import { hotelConstants } from '../constants/hotelConstants.js';

const initialState = {
    isSent: false,
    info: [],
    error: null
}

export function hotelReducer (state = initialState, action) {
    switch(action.type) {
        case hotelConstants.GET_HOTELS_SUCCESS:
            console.log(action.payload.info);
            return {
                //...state,
                error: null,
                info: action.payload.info         
            };
        case hotelConstants.GET_HOTELS_FAILURE:
            return {
                //...state,
                isSent: false,
                error: action.payload.error
            };
        case hotelConstants.GET_HOTELS_REQUEST:
            return {
                //...state,
                error: null,
                isSent: true
            };

        default:
            return state;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    }
}