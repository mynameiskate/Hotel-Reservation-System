import {
    fileConstants
} from '../constants/fileConstants';

import {
    imagesOnly
} from '../constants/validationRules';
import FileService from '../services/FileService';

class FileActions {
    static chooseFiles(files) {
        const chooseRequest = (files) => {
            return {
                type: fileConstants.ADD_IMAGE_REQUEST,
                payload: {
                    files
                }
            }
        };

        const chooseSuccess = (files) => {
            return {
                type: fileConstants.ADD_IMAGE_SUCCESS,
                payload: {
                    files
                }
            }
        };

        const chooseFailure = () => {
            return {
                type: fileConstants.ADD_IMAGE_FAILURE,
                payload: {}
            }
        };

        return dispatch => {
            dispatch(chooseRequest(files));
            imagesOnly(files) ?
                dispatch(chooseSuccess(files)) :
                dispatch(chooseFailure())
        }
    }

    static uploadImages(roomId, images) {
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
            FileService.uploadRoomImages(roomId, images);
            /*    .then(handleError)
                .then(result => result.json())
                .then(jsonInfo => {
                    dispatch(uploadSuccess(jsonInfo));
                    return jsonInfo;
                })
                .catch(error => dispatch(uploadFailure(error)));*/
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