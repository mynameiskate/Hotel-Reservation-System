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
    isSent: false
}

export function searchReducer(state = initialState, action) {
    let data = action.payload;
    switch (action.type) {
        case searchConstants.GET_HOTELS_REQUEST:
            return {
                ...state,
                page: data.page,
                error: null,
                isSent: true,
                nextPage: null
            }
        case searchConstants.GET_HOTELS_SUCCESS:
            const resultCount = data.pageCount;
            const pageSize = data.pageSize;
            const page = data.page;
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
        case searchConstants.GET_HOTELS_FAILURE:
            return {...state,
                filters: {},
                error: data.error
            }
        default:
            return state;
    }
}