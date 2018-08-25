import {
    fileConstants
} from '../constants/fileConstants';

const initialState = {
    isLoading: false,
    files: [],
    isFileTypeValid: true,
    error: null,
    imageIds: [],
    filesSelected: false
}

export function fileReducer(state = initialState, action) {
    let data = action.payload;
    switch (action.type) {
        case fileConstants.SET_IMAGES:
            return {
                ...state,
                imageIds: data.imageIds
            }
        case fileConstants.ADD_IMAGE_REQUEST:
            return {
                ...state,
                filesSelected: false
            }
        case fileConstants.ADD_IMAGE_SUCCESS:
            return {
                ...state,
                isFileTypeValid: true,
                filesSelected: true
            }
        case fileConstants.ADD_IMAGE_FAILURE:
            return {
                ...state,
                isFileTypeValid: false,
                filesSelected: false
            }
        case fileConstants.UPLOAD_FILES_REQUEST:
            return {
                ...state,
                isLoading: true,
                filesSelected: false
            }
        case fileConstants.RESET_IMAGES:
            return {
                ...state,
                imageIds: []
            }
        case fileConstants.UPLOAD_FILES_SUCCESS:
            {
                const imageId = data.info;
                const currentImageIds = state.imageIds;

                const imageIds = [ ...imageId, ...currentImageIds];

                if (!imageId) return state;
                return {
                    ...state,
                    imageIds: [
                        ...currentImageIds,
                        ...imageId
                    ],
                    isLoading: false
                }
            }
        case fileConstants.UPLOAD_FILES_FAILURE:
            return {
                ...state,
                imageIds: null,
                isLoading: false,
                error: data.error
            }
        case fileConstants.DELETE_IMAGE_REQUEST:
            const imageIds = state.imageIds.filter(id => id !== data.imageId);
            return {
                ...state,
                imageIds
            }
        default:
            return state;
    }
}