import { userConstants } from '../constants/userConstants.js';
import UserService from '../services/UserService.js';

class UserActions {
    static logIn(userInfo) {
        const logInRequest = (info) => { return { type: userConstants.SIGN_IN_REQUEST, payload: { info } } };
        const logInFailure = (error) => { return { type: userConstants.SIGN_IN_FAILURE, payload: { error } } };
        const logInSuccess = () => { return { type: userConstants.SIGN_IN_SUCCESS, payload: {} } };

        return dispatch => {
            dispatch(logInRequest(userInfo));
            UserService.logIn(userInfo)
                .then(handleError)
                .then(dispatch(logInSuccess()))
                .catch(error => dispatch(logInFailure(error)));
        }
    }

    static signUp(userInfo) {
        const signUpRequest = (info) => { return { type: userConstants.SIGN_UP_REQUEST, payload: { info } } };
        const signUpFailure = (error) => { return { type: userConstants.SIGN_UP_FAILURE, payload: { error } } };
        const signUpSuccess = (info) => { return { type: userConstants.SIGN_UP_SUCCESS, payload: { info } } };

        return dispatch => {
            dispatch(signUpRequest(userInfo));
            UserService.signUp(userInfo)
                .then(handleError)
                .then(dispatch(signUpSuccess(userInfo)))
                .catch(error => dispatch(signUpFailure(error)));
        }
    }

    static getInfo() {
        const getInfoRequest = (info) => { return { type: userConstants.GET_INFO, payload: { info } } };
        return (dispatch, stateAccessor) => {
            let info = stateAccessor().users.userInfo;
            dispatch(getInfoRequest(info));
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