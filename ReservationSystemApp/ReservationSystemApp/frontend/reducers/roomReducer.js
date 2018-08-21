import {
    roomConstants
} from '../constants/roomConstants';

const initialState = {
    isLoading: false,
    info: [],
    error: null,
    page: 1,
    resultCount: 0,
    pageSize: 0,
    pageCount: 1,
    nextPage: null,
    adults: null,
    currentRoomId: null,
    cost: null,
    adults: null,
    currentRoom: null,
    isRoomAvailable: false
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
            const pageCount = (pageSize > 0) ? Math.ceil(resultCount / pageSize) : 0;
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
        case roomConstants.SET_AVAILABILITY:
            return {
                ...state,
                isRoomAvailable: !state.isRoomAvailable
            }
        case roomConstants.SET_ROOM_COST:
            return {
                ...state,
                cost: data.cost
            }
        case roomConstants.SET_CURRENT_ROOM_PAGE:
            return {
                ...state,
                page: data.currentPage
            }
        case roomConstants.GET_ROOM_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
                nextPage: null
            }
        case roomConstants.GET_ROOM_SUCCESS:
            const room = data.roomInfo;
            return {
                ...state,
                error: null,
                isLoading: false,
                cost: room.cost,
                currentRoom: room ? room.entities[0] : null,
                adults: room.adults,
                isRoomAvailable: room.isAvailable
            }
        case roomConstants.GET_ROOM_FAILURE:
            return {
                ...state,
                error: data.error,
                isLoading: false
            }
        default:
            return state;
    }
}