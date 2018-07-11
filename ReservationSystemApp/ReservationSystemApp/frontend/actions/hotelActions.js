import { hotelConstants } from '../constants/hotelConstants.js';
import { hotelServices } from '../services/hotelService.js';

export const hotelActions = {
	findAll
}

function findAll() {
    return dispatch => {
        dispatch(sendRequest());
        hotelServices.getAll()
            .then(handleError)
            .then(result => result.json())
            .then(jsonInfo => {
                    dispatch(receiveData(jsonInfo));         //success
                    return jsonInfo;
                }
            )
            .catch(error => dispatch(failToFind(error)));   //failure
	}
}

const sendRequest = () => { return { type: hotelConstants.GET_HOTELS_REQUEST } };
const receiveData = (info) => { return { type: hotelConstants.GET_HOTELS_SUCCESS, payload: { info } }; };
const failToFind = (error) => { return { type: hotelConstants.GET_HOTELS_FAILURE, payload: { error } }; };

function handleError(response) {
    if (!response.ok) {
        throw Error(response.status)
    }
    return response;
}


