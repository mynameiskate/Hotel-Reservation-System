import { userConstants } from '../constants/userConstants.js';
import { UserService } from '../services/UserService.js';

class UserActions {
    static logIn(userInfo) {
        const logInRequest = (info) => { return { type: userConstants.SIGN_IN_REQUEST, payload: {info}} };
        const logInFailure = (error) => { return { type: userConstants.SIGN_IN_ERROR, payload: {error}} };
        const logInSuccess = () => { return {type: userConstants.SIGN_IN_SUCCESS, payload: {}}};

        return dispatch => {
            dispatch(logInRequest(userInfo));
            UserService.logIn(userInfo)
                .then(handleError)
                .then(dispatch(logInSuccess()))
                .catch(error => dispatch(logInFailure(error)));
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