import {
    reservationConstants
} from '../constants/reservationConstants.js';

const initialState = {
    isLoading: false,
    info: [],
    error: null,
    currentRoomId: null
}

export function reservationReducer(state = initialState, action) {
    let data = action.payload;
    switch (action.type) {
        case reservationConstants.BOOK_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
                currentRoomId: data.roomId
            }
        case reservationConstants.BOOK_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
            }
        case reservationConstants.BOOK_FAILURE:
            return {
                ...state,
                error: data.error,
                isLoading: false
            }
        default:
            return state;
    }
}