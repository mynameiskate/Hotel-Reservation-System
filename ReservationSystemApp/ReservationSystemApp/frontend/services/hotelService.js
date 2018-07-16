import { settings } from '../config/settings.js';

export const hotelServices = {
    getAll,
    add,
    update,
    remove,
    filter,
    getHotel
}

function getAll() {
    const path = "/hotels/all"
    const options = {
        method: "GET",

    };
    return fetch(settings.baseUrl + path, options);
}

function add() {

}

function getHotel(id) {
    const path = `/hotels/${id}`;
    const options = {
        method: 'GET'
    };

    return fetch(settings.baseUrl + path, options);
}

function update(id, info) {
    const path = `/hotels/${id}`;
    const options = {
        method: 'PUT',
        body: JSON.stringify(info),
        dataType: 'json',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(settings.baseUrl + path, options);
}

function remove(id) {
    const path = `api/hotels/${id}`;
    const options = {
        method: "DELETE"
    };

    return fetch(settings.baseUrl + path, options);
}

function filter() {

}