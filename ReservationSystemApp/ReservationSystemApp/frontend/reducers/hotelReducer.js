import { hotelConstants } from '../constants/hotelConstants.js';

const initialState = {
    isSent: false,
    info: [],
    error: null,
    removing: false,
    editing: false,
    loaded: null,
    isValid: false,
    locations: null,
    selectedCountry: '',
    selectedCity: '',
    currentPage: 1,
    resultCount: 0,
    filters: {},
    pageSize: 0
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
                loaded: data.loaded,
            }
        case hotelConstants.SHOW_HOTEL_SUCCESS:
            return {
                ...state,
                isSent: false,
                loaded: data.loaded,
                editing: false
            }
        case hotelConstants.SHOW_HOTEL_FAILURE:
            return {
                ...state,
                error: data.error,
                isSent: false,
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
        case hotelConstants.GET_HOTELS_REQUEST:
            return {
                ...state,
                error: null
            }
        case hotelConstants.GET_LOCATIONS_SUCCESS:
            return {
                ...state,
                locations: data.locations
            }
        case hotelConstants.GET_HOTELS_FAILURE:
            return {
                ...state,
                error: data.error
            }
        case hotelConstants.SET_CURRENT_COUNTRY:
            return {
                ...state,
                selectedCity: '',
                selectedCountry: data.selectedCountry
            }
        case hotelConstants.SET_CURRENT_CITY:
            return {
                ...state,
                selectedCity: data.selectedCity
            }
        case hotelConstants.SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: data.currentPage
            }
        case hotelConstants.GET_HOTEL_PAGE_REQUEST:
            return {
                ...state,
                currentPage: data.currentPage,
                error: null,
                filters: data.filters,
                isSent: true
            }
        case hotelConstants.GET_HOTEL_PAGE_SUCCESS:
            return {
                ...state,
                info: data.info,
                isSent: false,
                currentPage: data.info.number,
                resultCount: data.info.totalHotelAmount,
                pageSize: data.info.pageSize
            }
        case hotelConstants.GET_HOTEL_PAGE_FAILURE:
            return {
                ...state,
                error: data.error,
                isSent: false,
                info: null,
                currentPage: 0,
                resultCount: 0
            }
        default:
            return state;
    }
}