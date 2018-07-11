import { hotelConstants } from '../constants/hotelConstants.js';

const initialState = {
    isSent: false,
    info: [],
    error: null
}

export function hotelReducer(state = initialState, action) {
    let data = action.payload;
    switch (action.type) {
        case hotelConstants.GET_HOTELS_SUCCESS:
            //console.log(data.info);
            return {
                ...state,
                error: null,
                info: data.info,
                isSent: false
            };
        case hotelConstants.GET_HOTELS_FAILURE:
            return {
                ...state,
                isSent: false,
                error: data.error
            };
        case hotelConstants.GET_HOTELS_REQUEST:
            return {
                ...state,
                error: null,
                isSent: true
            };
        case hotelConstants.REMOVE_HOTEL_REQUEST:
            return {
                ...state,
                error: null,
                isSent: true
            }
        case hotelConstants.REMOVE_HOTEL_SUCCESS:
            console.log(data.info);
            return {
                ...state,
                error: null,
                info: data.info.filter(hotel => hotel.hotelId !== data.id),
                isSent: false
            }
        case hotelConstants.REMOVE_HOTEL_FAILURE:
            return {
                ...state,
                error: data.error,
                isSent: false
            }
        default:
            return state;
    }
}