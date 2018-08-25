import {
    hotelConstants
} from '../constants/hotelConstants';

const initialState = {
    isLoading: false,
    info: [],
    error: null,
    removing: false,
    editing: false,
    loaded: null,
    isValid: false,
    locations: null,
    page: 1,
    resultCount: 0,
    pageSize: 0,
    pageCount: 1,
    nextPage: null
}

export function hotelReducer(state = initialState, action) {
    let data = action.payload;
    switch (action.type) {
        case hotelConstants.REMOVE_HOTEL_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
                removing: true,
                info: (state.info.map(hotel =>
                    (hotel.hotelId === data.id) ? {...hotel,
                        isRemoved: true
                    } :
                    hotel))
            }
        case hotelConstants.REMOVE_HOTEL_SUCCESS:
            return {
                error: null,
                info: state.info.filter(hotel => hotel.hotelId !== data.id),
                isLoading: false,
                removing: false
            }
        case hotelConstants.REMOVE_HOTEL_FAILURE:
            return {
                ...state,
                error: data.error,
                isLoading: false,
                removing: false,
                info: (state.info.map(hotel =>
                    (hotel.hotelId === data.id) ? {...hotel,
                        isRemoved: false
                    } :
                    hotel))
            }
        case hotelConstants.EDIT_HOTEL_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
                editing: true
            }
        case hotelConstants.EDIT_HOTEL_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                info: (state.info.map(hotel =>
                    (hotel.hotelId === data.id) ?
                    state.hotelInfo :
                    hotel)),
                editing: false
            }
        case hotelConstants.EDIT_HOTEL_FAILURE:
            return {
                ...state,
                error: `Error occured: ${data.error}`,
                isLoading: false
            }
        case hotelConstants.SHOW_HOTEL_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
                loaded: data.loaded,
            }
        case hotelConstants.RESET_HOTEL_INFO:
            return {
                ...state,
                loaded: null
            }
        case hotelConstants.SHOW_HOTEL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                loaded: data.loaded.entities ? data.loaded.entities[0] : null,
                editing: false
            }
        case hotelConstants.SHOW_HOTEL_FAILURE:
            return {
                ...state,
                error: data.error,
                isLoading: false,
                loaded: null
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
                isValid: false
            }
        case hotelConstants.STOP_EDITING:
            return {
                ...state,
                editing: false,
                error: null,
                loaded: state.loaded
            }
        case hotelConstants.GET_LOCATIONS_SUCCESS:
            return {
                ...state,
                locations: data.locations
            }
        case hotelConstants.RESET_FILTER:
            return {
                ...state,
                selectedCity: {
                    value: ''
                },
                selectedCountry: {
                    value: '',
                    id: '',
                    name: ''
                },
                filters: {}
            }
        case hotelConstants.CREATE_HOTEL_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
                loaded: data.hotel
            }
        case hotelConstants.CREATE_HOTEL_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                loaded: data.hotel
            }
        case hotelConstants.CREATE_HOTEL_FAILURE:
            return {
                ...state,
                error: `Error occured: ${data.error}`,
                isLoading: false,
                loaded: null
            }
        default:
            return state;
    }
}