import {
    roomConstants
} from '../constants/roomConstants.js';

const initialState = {
    isLoading: false,
    info: [],
    error: null,
    page: 1,
    resultCount: 0,
    pageSize: 0,
    pageCount: 1,
    nextPage: null,
    adults: 1
}

export function roomReducer(state = initialState, action) {
    let data = action.payload;
    switch (action.type) {
        case roomConstants.GET_ROOMS_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
                nextPage: null
            }
        case roomConstants.GET_ROOMS_SUCCESS:
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
                selectedStars: data.selectedStars,
                page,
                resultCount,
                pageSize,
                pageCount,
                nextPage
            }
        case roomConstants.GET_ROOMS_FAILURE:
            return {
                ...state,
                error: data.error,
                isLoading: false
            }
        case roomConstants.SET_ADULTS:
            return {
                ...state,
                adults: data.adults
            }
        case roomConstants.SET_CURRENT_PAGE:
            return {
                ...state,
                page: data.currentPage
            }
        default:
            return state;
    }
}