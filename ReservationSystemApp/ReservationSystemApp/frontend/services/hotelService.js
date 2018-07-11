import {settings} from '../config/settings.js';

export const hotelServices = {
	getAll,
	add,
	update,
	remove,
	filter
}

function getAll() {
	const path = "/hotels/all"
	const options = {
		method: "GET"
	};

    return fetch(settings.baseUrl + path, options)
}

function add() {

}

function update() {

}

function remove() {

}

function filter() {

}