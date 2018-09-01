import {
    userConstants
} from '../constants/userConstants';

const initialState = {
    isLoading: false,
    error: null,
    isValid: false,
    userInfo: {},
    loggedIn: false,
    isLoading: true,
    redirect: false,
    isAdmin: false,
    signedUp: false
}

export function userReducer(state = initialState, action) {
    let data = action.payload;
    switch (action.type) {
        case userConstants.SIGN_IN_REQUEST:
            return {
                ...state,
                error: null,
                userInfo: data.info,
                isLoading: true,
                loggedIn: false,
                redirect: false,
                signedUp: false
            };
        case userConstants.SIGN_IN_SUCCESS:
            return {
                ...state,
                error: null,
                userInfo: state.userInfo,
                isLoading: false,
                loggedIn: true,
                redirect: true
            }
        case userConstants.SIGN_IN_FAILURE:
            return {
                ...state,
                error: data.error,
                isValid: false,
                loggedIn: false,
                redirect: false,
                isAdmin: false,
                isLoading: false
            }
        case userConstants.SIGN_UP_REQUEST:
            return {
                ...state,
                isLoading: true,
                userInfo: data.info,
                error: null,
                loggedIn: false,
                redirect: false
            }
        case userConstants.SIGN_UP_SUCCESS:
            return {
                ...state,
                error: null,
                userInfo: state.userInfo,
                isLoading: false,
                signedUp: true
            }
        case userConstants.SIGN_UP_FAILURE:
            return {
                ...state,
                error: data.error || null,
                isValid: false,
                isLoading: false,
                loggedIn: false,
                redirect: false,
                isAdmin: false,
                signedUp: false
            }
        case userConstants.GET_INFO:
            return {
                ...state,
                loggedIn: state.loggedIn,
                userInfo: state.userInfo,
            }
        case userConstants.GET_PROFILE_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
                userInfo: {},
                isLoading: true,
                redirect: false
            }
        case userConstants.GET_PROFILE_SUCCESS:
            return {
                ...state,
                error: null,
                userInfo: data.info,
                isLoading: false,
                loggedIn: true,
                isLoading: false,
                isAdmin: data.info.isAdmin
            }
        case userConstants.GET_PROFILE_FAILURE:
            return {
                ...state,
                error: data.error,
                userInfo: {},
                isLoading: false,
                loggedIn: false,
                isLoading: false,
                redirect: false,
                isAdmin: false
            }
        case userConstants.GET_CURRENT_PROFILE:
            return {
                ...state,
                error: null,
                loggedIn: true,
                userInfo: state.userInfo,
            }
        case userConstants.RESET:
            return {
                ...state,
                error: null,
                isLoading: false,
                error: null,
                isLoading: false,
                redirect: false
            }
        case userConstants.SIGN_OUT_REQUEST:
            return {
                isLoading: true
            }
        case userConstants.SIGN_OUT_FAILURE:
            return {
                isLoading: false,
                error: data.error
            }
        case userConstants.SIGN_OUT_SUCCESS:
            return {
                isLoading: false,
                userInfo: {},
                loggedIn: false
            }
        default:
            return state;
    }
}