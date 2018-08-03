import {
    searchConstants
} from '../constants/searchConstants.js';

const initialState = {
    info: [],
    error: null,
    locations: null,
    selectedCountry: '',
    selectedCity: '',
    page: 1,
    resultCount: 0,
    filters: {},
    pageSize: 0,
    pageCount: 1,
    nextPage: null,
    isLoading: false
}

export function searchReducer(state = initialState, action) {
    let data = action.payload;
    switch (action.type) {
        case searchConstants.GET_HOTELS_REQUEST:
            return {
                ...state,
                page: data.page,
                error: null,
                isLoading: true,
                nextPage: null
            }
        case searchConstants.GET_HOTELS_SUCCESS:
            const resultCount = data.info.totalHotelAmount;
            const pageSize = data.info.pageSize;
            const page = data.info.number;
            const pageCount = pageSize ? Math.ceil(resultCount / pageSize) : 0;
            const nextPage = (page < pageCount) ? (page + 1) : null;
            return {
                ...state,
                info: data.info,
                isLoading: false,
                page,
                resultCount,
                pageSize,
                pageCount,
                nextPage
            }
        case searchConstants.GET_HOTELS_FAILURE:
            return {...state,
                filters: {},
                error: data.error,
            }
        default:
            return state;
    }
}