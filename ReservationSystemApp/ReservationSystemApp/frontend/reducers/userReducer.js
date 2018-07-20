import { userConstants } from '../constants/userConstants.js';

const initialState = {
    isSent: false,
    error: null,
    isValid: false,
    userInfo: {}
}

export function userReducer(state = initialState, action) {

    switch (action.type) {
        default: return state;
    }
}