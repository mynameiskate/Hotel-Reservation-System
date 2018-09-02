import {
    combineReducers
} from 'redux';
import {
    hotelReducer
} from '../reducers/hotelReducer';
import {
    userReducer
} from '../reducers/userReducer'
import {
    reducer as reduxFormReducer
} from 'redux-form';
import {
    searchReducer
} from '../reducers/searchReducer';
import {
    roomReducer
} from '../reducers/roomReducer';
import {
    reservationReducer
} from '../reducers/reservationReducer';
import {
    fileReducer
} from '../reducers/fileReducer';
import {reducer as toastrReducer} from 'react-redux-toastr'

export const rootReducer = combineReducers({
    hotels: hotelReducer,
    form: reduxFormReducer,
    users: userReducer,
    search: searchReducer,
    rooms: roomReducer,
    reservations: reservationReducer,
    files: fileReducer,
    toastr: toastrReducer
});