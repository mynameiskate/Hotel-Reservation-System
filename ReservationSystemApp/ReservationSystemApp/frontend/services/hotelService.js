import { settings } from '../config/settings.js';
import { links } from '../config/links.js';

export const hotelServices = {
    getAll,
    add,
    update,
    remove,
    filter,
    getHotel
}

function getAll() {
    const path = links.HOTEL_LIST_PAGE;
    const options = {
        method: 'GET',
    };
    return fetch(settings.baseUrl + path, options);
}

function add() {

}

function getHotel(id) {
    const path = links.HOTEL_ID_PAGE(id);
    const options = {
        method: 'GET'
    };

    return fetch(settings.baseUrl + path, options);
}

function update(id, info) {
    const path = links.HOTEL_ID_PAGE(id);
    const options = {
        method: 'PUT',
        body: JSON.stringify(info),
        dataType: 'json',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(settings.baseUrl + path, options);
}

function remove(id) {
    const path = links.HOTEL_ID_PAGE(id);
    const options = {
        method: 'DELETE'
    };

    return fetch(settings.baseUrl + path, options);
}

function filter() {

}