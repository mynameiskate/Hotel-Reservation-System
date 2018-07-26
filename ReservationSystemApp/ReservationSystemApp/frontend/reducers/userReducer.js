import { userConstants } from '../constants/userConstants.js';

const initialState = {
    isSent: false,
    error: null,
    isValid: false,
    userInfo: {},
    loggedIn: false,
    isLoading: true
}

export function userReducer(state = initialState, action) {
    let data = action.payload;
    switch (action.type) {
        case userConstants.SIGN_IN_REQUEST:
            return {
                ...state,
                error: null,
                userInfo: data.info,
                isSent: true,
                loggedIn: false
            };
        case userConstants.SIGN_IN_SUCCESS:
            return {
                ...state,
                error: null,
                userInfo: state.userInfo,
                isSent: false,
                loggedIn: true
            }
        case userConstants.SIGN_IN_FAILURE:
            return {
                ...state,
                error: data.error,
                isValid: false,
                isSent: false,
                loggedIn: false
            }
        case userConstants.SIGN_UP_REQUEST:
            return {
                ...state,
                isSent: true,
                userInfo: data.info,
                error: null,
                loggedIn: false
            }
        case userConstants.SIGN_UP_SUCCESS:
            return {
                ...state,
                error: null,
                userInfo: state.userInfo,
                isSent: false
            }
        case userConstants.SIGN_UP_FAILURE:
            return {
                ...state,
                error: data.error,
                isValid: false,
                isSent: false,
                loggedIn: false
            }
        case userConstants.GET_INFO:
            return {
                ...state,
                loggedIn: state.loggedIn,
                userInfo: state.userInfo
            }
        case userConstants.GET_PROFILE_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
                userInfo: {},
                isSent: true
            }
        case userConstants.GET_PROFILE_SUCCESS:
            return {
                ...state,
                error: null,
                userInfo: data.info,
                isSent: false,
                loggedIn: true,
                isLoading: false
            }
        case userConstants.GET_PROFILE_FAILURE:
            return {
                ...state,
                error: data.error,
                userInfo: {},
                isSent: false,
                loggedIn: false,
                isLoading: false
            }
        case userConstants.GET_CURRENT_PROFILE:
            return {
                ...state,
                error: null,
                loggedIn: true,
                userInfo: state.userInfo
            }
        default:
            return state;
    }
}