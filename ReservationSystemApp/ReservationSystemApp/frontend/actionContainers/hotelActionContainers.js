import { hotelActions } from '../actions/hotelActions.js';
import { hotelServices } from '../services/hotelService.js'

export const hotelContainer = {
	findHotels
}

function findHotels() {
	return dispatch => {
		dispatch(hotelActions.findHotelsRequest());

		hotelServices.getAll().then(
			(hotels) => dispatch(hotelActions.findHotels(info)), //success
			(error) => dispatch(hotelActions.failToFind(error))  //failure
		);

	}
}