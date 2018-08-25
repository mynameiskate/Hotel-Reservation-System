import {
    fileConstants
} from '../constants/fileConstants';

import {
    imagesOnly
} from '../constants/validationRules';
import FileService from '../services/FileService';

class FileActions {
    static setImages(imageIds) {
        const setRequest = (imageIds) => {
            return {
                type: fileConstants.SET_IMAGES,
                payload: {
                    imageIds
                }
            }
        }

        return dispatch => {
            dispatch(setRequest(imageIds));
        }
    }

    static removeAllImages() {
        const resetRequest = () => {
            return {
                type: fileConstants.RESET_IMAGES
            }
        }

        return dispatch => {
            dispatch(resetRequest());
        }
    }

    static chooseFiles(files) {
        const chooseRequest = () => {
            return {
                type: fileConstants.ADD_IMAGE_REQUEST
            }
        };

        const chooseFailure = () => {
            return {
                type: fileConstants.ADD_IMAGE_FAILURE,
            }
        };

        return dispatch => {
            dispatch(chooseRequest())
            imagesOnly(files) ?
                dispatch(this.uploadImages(files)) :
                dispatch(chooseFailure());
        }
    }

    static uploadImages(images) {
        const uploadRequest = (files) => {
            return {
                type: fileConstants.UPLOAD_FILES_REQUEST,
                payload: {
                    files
                }
            }
        };

        const uploadSuccess = (info) => {
            return {
                type: fileConstants.UPLOAD_FILES_SUCCESS,
                payload: {
                    info
                }
            }
        };

        const uploadFailure = (error) => {
            return {
                type: fileConstants.UPLOAD_FILES_FAILURE,
                payload: {
                    error
                }
            }
        };

        return (dispatch) => {
            dispatch(uploadRequest(images));
            FileService.uploadImages(images)
                .then(handleError)
                .then(result => result.json())
                .then(jsonInfo => {
                    dispatch(uploadSuccess(jsonInfo));
                    return jsonInfo;
                })
                .catch(error => dispatch(uploadFailure(error)));
        }
    }


    static deleteImage(imageId) {
        const deleteRequest = (imageId) => {
            return {
                type: fileConstants.DELETE_IMAGE_REQUEST,
                payload: {
                    imageId
                }
            }
        }
        return dispatch => {
            dispatch(deleteRequest(imageId));
        }
    }
}

function handleError(response) {
    if (!response.ok) {
        throw Error(response.status)
    }
    return response;
}

export default FileActions;