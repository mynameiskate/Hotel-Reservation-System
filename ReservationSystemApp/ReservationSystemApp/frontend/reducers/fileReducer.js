import {
    fileConstants
} from '../constants/fileConstants';

const initialState = {
    isLoading: false,
    files: [],
    isFileTypeValid: true,
    error: null
}

export function fileReducer(state = initialState, action) {
    let data = action.payload;
    switch (action.type) {
        case fileConstants.ADD_IMAGE_REQUEST:
            return {
                ...state,
                files: []
            }
        case fileConstants.ADD_IMAGE_SUCCESS:
            return {
                ...state,
                isFileTypeValid: true,
                files: data.files
            }
        case fileConstants.ADD_IMAGE_FAILURE:
            return {
                ...state,
                isFileTypeValid: false,
                files: []
            }

        default:
            return state;
    }
}