import {
    combineReducers
} from 'redux';
import {
    hotelReducer
} from '../reducers/hotelReducer.js';
import {
    userReducer
} from '../reducers/userReducer.js'
import {
    reducer as reduxFormReducer
} from 'redux-form';
import {
    searchReducer
} from '../reducers/searchReducer.js';
import {
    roomReducer
} from '../reducers/roomReducer.js';

export const rootReducer = combineReducers({
    hotels: hotelReducer,
    form: reduxFormReducer,
    users: userReducer,
    search: searchReducer,
    rooms: roomReducer
});