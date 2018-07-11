import { hotelConstants } from '../constants/hotelConstants.js';

export const hotelActions = {
    findHotels,
    findHotelsRequest,
    failToFind
}

function findHotels(info){
	return {
        type: hotelConstants.GET_HOTELS_SUCCESS,
        payload: { info }
		//data: info
	}
}

function findHotelsRequest(){
	return {
        type: hotelConstants.GET_HOTELS_REQUEST
        //isSent: true
	}
}

function failToFind(err){
	return {
        type: hotelConstants.GET_HOTELS_FAILURE,
        payload: { err }
		//error: err
	}
}


