import { hotelActions } from '../actions/hotelActions.js';
import { hotelService } from '../services/hotelService.js'

export const hotelActions = {
	findHotels
}

function findHotels() {
	return dispatch => {
		dispatch(findHotelsRequest());

		hotelService.getAll().then(
			(hotels) => dispatch(findHotels(info)),
			(error) => dispatch(failToFind(error))
		);

	}
}