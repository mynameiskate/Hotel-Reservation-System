import {
    fileConstants
} from '../constants/fileConstants';

const initialState = {
    isLoading: false,
    files: [],
    isFileTypeValid: true,
    error: null,
    imageIds: []
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
        case fileConstants.UPLOAD_FILES_REQUEST:
            return {
                ...state,
                isLoading: true,
                files: data.files
            }
        case fileConstants.UPLOAD_FILES_SUCCESS:
            return {
                ...state,
                imageIds: data.info,
                isLoading: false
            }
        case fileConstants.UPLOAD_FILES_FAILURE:
            return {
                ...state,
                imageIds: null,
                isLoading: false,
                error: data.error
            }
        default:
            return state;
    }
}