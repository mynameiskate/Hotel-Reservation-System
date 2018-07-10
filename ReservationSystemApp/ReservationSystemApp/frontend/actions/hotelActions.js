import { hotelConstants } from '../constants/hotelConstants.js';

function findHotels(info){
	return {
		type: hotelConstants.GET_HOTELS_SUCCESS,
		data: info
	}
}

function findHotelsRequest(){
	return {
		type: hotelConstants.GET_HOTELS_REQUEST
	}
}

function failToFind(err){
	return {
		type: hotelConstants.GET_HOTELS_FAILURE,
		error: err
	}
}


