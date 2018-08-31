import {
    userConstants
} from '../constants/userConstants';
import {
    links
} from '../config/links';
import UserService from '../services/UserService';
import {
    history
} from '../store/store';

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
                .then(result =>
                    result.json()
                )
                .then(response => {
                    localStorage.setItem('token', response.token);
                    return response;
                })
                .then(response => {
                    dispatch(logInSuccess(response));
                    return response;
                })
                .then(() => history.push(links.HOTEL_ID_SEARCH_PAGE()))
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
                .then(() => {
                    dispatch(signUpSuccess(userInfo));
                    dispatch(this.logIn({
                        email: userInfo.email,
                        password: userInfo.password
                    }));
                })
                .catch(error => dispatch(signUpFailure(error)));
        }
    }

    static signOut() {
        const signOutRequest = () => {
            return {
                type: userConstants.SIGN_OUT_REQUEST
            }
        };

        const signOutFailure = (error) => {
            return {
                type: userConstants.SIGN_OUT_FAILURE,
                payload: {
                    error
                }
            }
        };

        const signOutSuccess = () => {
            return {
                type: userConstants.SIGN_OUT_SUCCESS
            }
        };

        return (dispatch) => {
            dispatch(signOutRequest());
            try {
                localStorage.removeItem('token');
                dispatch(signOutSuccess());
            } catch (err) {
                dispatch(signOutFailure(err));
            }
            history.push(links.SIGN_IN_PAGE);
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
                payload: {}
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
            const isLoggedIn = stateAccessor().users.loggedIn;
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