import {
    searchConstants
} from '../constants/searchConstants.js';

const initialState = {
    info: [],
    error: null,
    locations: null,
    selectedCountry: null,
    selectedCity: null,
    page: null,
    resultCount: 0,
    pageSize: 0,
    pageCount: 1,
    nextPage: null,
    isLoading: false,
    hotelName: null,
    moveInTime: null,
    moveOutTime: null,
    dateError: null
}

export function searchReducer(state = initialState, action) {
    let data = action.payload;
    switch (action.type) {
        case searchConstants.GET_HOTELS_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
                nextPage: null
            }
        case searchConstants.GET_HOTELS_SUCCESS:
            const resultCount = data.info.totalAmount;
            const pageSize = data.info.pageSize;
            const requestPage = data.info.pageNumber;
            const pageCount = pageSize ? Math.ceil(resultCount / pageSize) : 0;
            const page = (requestPage > pageCount) ? 1 : requestPage;
            const nextPage = (page < pageCount) ? (page + 1) : null;

            return {
                ...state,
                info: data.info.entities,
                isLoading: false,
                page,
                resultCount,
                pageSize,
                pageCount,
                nextPage,
                moveInTime: data.moveInTime || state.moveInTime,
                moveOutTime: data.moveOutTime || state.moveOutTime
            }
        case searchConstants.GET_HOTELS_FAILURE:
            return {...state,
                error: data.error
            }
        case searchConstants.SET_CURRENT_COUNTRY:
            return {
                ...state,
                selectedCity: null,
                selectedCountry: data.selectedCountry,
                page: 1
            }
        case searchConstants.SET_CURRENT_CITY:
            return {
                ...state,
                selectedCity: data.selectedCity,
                page: 1
            }
        case searchConstants.SET_CURRENT_PAGE:
            return {
                ...state,
                page: data.currentPage
            }
        case searchConstants.SET_CURRENT_HOTEL_NAME:
            return {
                ...state,
                hotelName: data.hotelName
            }
        case searchConstants.SET_START_DATE:
            return {
                ...state,
                moveInTime: data.moveInTime || state.moveInTime
            }
        case searchConstants.SET_END_DATE:
            return {
                ...state,
                moveOutTime: data.moveOutTime || state.moveOutTime,
                dateError: null
            }
        case searchConstants.INCORRECT_DATE_ERROR:
            return {
                ...state,
                dateError: data.dateError
            }
        default:
            return state;
    }
}