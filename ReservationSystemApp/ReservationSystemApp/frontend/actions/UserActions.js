import {
    userConstants
} from '../constants/userConstants.js';
import UserService from '../services/UserService.js';

class UserActions {
    static logIn(userInfo) {
        const logInRequest = (info) => {
            return {
                type: userConstants.SIGN_IN_REQUEST,
                payload: {
                    info
                }
            }
        };
        const logInFailure = (error) => {
            return {
                type: userConstants.SIGN_IN_FAILURE,
                payload: {
                    error
                }
            }
        };
        const logInSuccess = () => {
            return {
                type: userConstants.SIGN_IN_SUCCESS,
                payload: {}
            }
        };

        return dispatch => {
            dispatch(logInRequest(userInfo));
            UserService.logIn(userInfo)
                .then(handleError)
                .then(result => result.json())
                .then(response => localStorage.setItem('token', response.token))
                .then(dispatch(logInSuccess()))
                .catch(error => dispatch(logInFailure(error)));
        }
    }

    static signUp(userInfo) {
        const signUpRequest = (info) => {
            return {
                type: userConstants.SIGN_UP_REQUEST,
                payload: {
                    info
                }
            }
        };
        const signUpFailure = (error) => {
            return {
                type: userConstants.SIGN_UP_FAILURE,
                payload: {
                    error
                }
            }
        };
        const signUpSuccess = (info) => {
            return {
                type: userConstants.SIGN_UP_SUCCESS,
                payload: {
                    info
                }
            }
        };

        return dispatch => {
            dispatch(signUpRequest(userInfo));
            UserService.signUp(userInfo)
                .then(handleError)
                .then(result => result.json())
                .then(dispatch(signUpSuccess(userInfo)))
                .catch(error => {
                    if (error) {
                        dispatch(signUpFailure(error));
                    }
                })
        }
    }

    static getInfo() {
        const getInfoRequest = () => {
            return {
                type: userConstants.GET_INFO,
                payload: {}
            }
        };

        return (dispatch) => {
            dispatch(getInfoRequest());
        }
    }

    static reset() {
        const resetRequest = () => {
            return {
                type: userConstants.RESET,
                payload: {}
            }
        }

        return (dispatch) => {
            dispatch(resetRequest());
        }
    }

    static getProfile() {
        const getCurrentInfo = () => {
            return {
                type: userConstants.GET_CURRENT_PROFILE,
                payload: {
                    info
                }
            }
        };
        const getRequest = (info) => {
            return {
                type: userConstants.GET_PROFILE_REQUEST,
                payload: {
                    info
                }
            }
        };
        const getFailure = (error) => {
            return {
                type: userConstants.GET_PROFILE_FAILURE,
                payload: {
                    error
                }
            }
        };
        const getSuccess = (info) => {
            return {
                type: userConstants.GET_PROFILE_SUCCESS,
                payload: {
                    info
                }
            }
        };

        return (dispatch, stateAccessor) => {
            let isLoggedIn = stateAccessor().users.loggedIn;
            if (!isLoggedIn) {
                dispatch(getRequest());
                UserService.getProfile()
                    .then(handleError)
                    .then(result => result.json())
                    .then(jsonInfo => {
                        dispatch(getSuccess(jsonInfo));
                        return jsonInfo;
                    })
                    .catch(error => dispatch(getFailure(error)));
            } else {
                dispatch(getCurrentInfo());
            }

        }
    }
}

function handleError(response) {
    if (!response.ok) {
        throw Error(response.status)
    }
    return response;
}

export default UserActions;