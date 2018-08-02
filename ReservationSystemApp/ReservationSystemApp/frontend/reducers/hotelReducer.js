import {
    hotelConstants
} from '../constants/hotelConstants.js';

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
    page: 1,
    resultCount: 0,
    filters: {},
    pageSize: 0,
    pageCount: 1,
    nextPage: null
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
                    (hotel.hotelId === data.id) ? {...hotel,
                        isRemoved: true
                    } :
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
                    (hotel.hotelId === data.id) ? {...hotel,
                        isRemoved: false
                    } :
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
            {
                const {
                    pageCount
                } = state;
                const {
                    page
                } = data;
                const nextPage = (page < pageCount) ? (page + 1) : null;
                return {
                    ...state,
                    page,
                    nextPage
                }
            }
        case hotelConstants.SET_FILTERS:
            return {
                ...state,
                filters: data.filters
            }
        case hotelConstants.RESET_CURRENT_PAGE:
            return {
                ...state,
                page: 1,
                nextPage: null,
                pageCount: 0
            }
        case hotelConstants.GET_HOTEL_PAGE_REQUEST:
            return {
                ...state,
                page: data.page,
                error: null,
                filters: data.filters,
                isSent: true
            }
        case hotelConstants.GET_HOTEL_PAGE_SUCCESS:
            {
                const resultCount = data.info.totalHotelAmount;
                const pageSize = data.info.pageSize;
                const page = data.info.number;
                const pageCount = pageSize ? Math.ceil(resultCount / pageSize) : 0;
                const nextPage = (page < pageCount) ? (page + 1) : null;
                return {
                    ...state,
                    info: data.info,
                    isSent: false,
                    page,
                    resultCount,
                    pageSize,
                    pageCount,
                    nextPage
                }
            }
        case hotelConstants.GET_HOTEL_PAGE_FAILURE:
            return {
                ...state,
                error: data.error,
                isSent: false,
                info: null,
                page: 0,
                resultCount: 0
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
        default:
            return state;
    }
}