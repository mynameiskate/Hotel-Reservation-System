import { hotelConstants } from '../constants/hotelConstants.js';

const initialState = {
    isSent: false,
    info: [],
    error: null,
    removing: false,
    editing: false,
    selected: null
}

export function hotelReducer(state = initialState, action) {
    let data = action.payload;
    switch (action.type) {
        case hotelConstants.GET_HOTELS_SUCCESS:
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
                isSent: true,
                removing: true,
                info: (state.info.map(hotel =>
                    (hotel.hotelId === data.id) ? {...hotel, isRemoved: true } :
                    hotel))
            }
        case hotelConstants.REMOVE_HOTEL_SUCCESS:
            return {
                error: null,
                info: state.info.filter(hotel => hotel.hotelId !== data.id),
                isSent: false,
                removing: false
            }
        case hotelConstants.REMOVE_HOTEL_FAILURE:
            return {
                ...state,
                error: data.error,
                isSent: false,
                removing: false,
                info: (state.info.map(hotel =>
                    (hotel.hotelId === data.id) ? {...hotel, isRemoved: false } :
                    hotel))
            }
        case hotelConstants.EDIT_HOTEL_REQUEST:
            return {
                ...state,
                error: null,
                isSent: true,
                editing: true
            }
        case hotelConstants.EDIT_HOTEL_SUCCESS:
            return {
                ...state,
                error: null,
                isSent: false,
                info: (state.info.map(hotel =>
                    (hotel.hotelId === data.id) ?
                    state.hotelInfo :
                    hotel)),
                editing: false
            }
        case hotelConstants.EDIT_HOTEL_FAILURE:
            return {
                ...state,
                error: data.error,
                isSent: false
            }

        case hotelConstants.SHOW_HOTEL_REQUEST:
            return {
                ...state,
                error: null,
                isSent: true,
                selected: data.selected,
            }
        case hotelConstants.SHOW_HOTEL_SUCCESS:
            return {
                ...state,
                isSent: false,
                selected: data.selected
            }
        case hotelConstants.SHOW_HOTEL_FAILURE:
            return {
                ...state,
                error: data.error,
                isSent: false,
                selected: null
            }
        case hotelConstants.HIDE_HOTEL:
            return {
                ...state,
                hotelInfo: null
            }
        case hotelConstants.START_EDITING:
            return {
                ...state,
                error: null,
                editing: true,
                id: data.id,
                selected: data.selected
            }
        case hotelConstants.STOP_EDITING:
            return {
                ...state,
                editing: false,
                error: null,
                selected: state.selected
            }
        default:
            return state;
    }
}