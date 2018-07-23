import { userConstants } from '../constants/userConstants.js';

const initialState = {
    isSent: false,
    error: null,
    isValid: false,
    userInfo: {},
    signingIn: true
}

export function userReducer(state = initialState, action) {
    let data = action.payload;
    switch (action.type) {
        case userConstants.SIGN_IN_REQUEST:
            return {
                ...state,
                error: null,
                userInfo: data.info,
                isSent: true
            };
        case userConstants.SIGN_IN_SUCCESS:
            return {
                ...state,
                error: null,
                userInfo: state.info,
                isSent: false
            }
        case userConstants.SIGN_IN_FAILURE:
            return {
                ...state,
                error: data.error,
                isValid: false,
                isSent: false
            }
        case userConstants.SIGN_UP_REQUEST:
            return {
                ...state,
                isSent: true,
                userInfo: data.info,
                error: null
            }
        case userConstants.SIGN_UP_SUCCESS:
            return {
                ...state,
                error: null,
                userInfo: state.info,
                isSent: false
            }
        case userConstants.SIGN_UP_FAILURE:
            return {
                ...state,
                error: data.error,
                isValid: false,
                isSent: false
            }
        default:
            return state;
    }
}