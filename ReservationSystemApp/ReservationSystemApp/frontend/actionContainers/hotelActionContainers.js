import { hotelActions } from '../actions/hotelActions.js';
import { hotelServices } from '../services/hotelService.js'

export const hotelContainer = {
	findHotels
}

function findHotels() {
    return dispatch => {
        dispatch(hotelActions.findHotelsRequest());
        hotelServices.getAll()
            .then(handleError)
            .then(result => result.json())
            .then(jsonInfo => {
                    dispatch(hotelActions.findHotels(jsonInfo));            //success
                    return jsonInfo;
                }
            )
            .catch(error => dispatch(hotelActions.failToFind(error)));   //failure
	}
}

function handleError(response) {
    if (!response.ok) {
        throw Error(response.status)
    }
    return response;
}