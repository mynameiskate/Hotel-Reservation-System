import React from 'react';
import Modal from 'react-modal';
import { reduxForm, Field } from 'redux-form';
import TimePicker from 'react-time-picker';

import InputField from './InputField.jsx';
import { isRequired, maxLength, minLength, isFullName } from '../constants/validationRules.js';
import { dateFormats } from '../constants/dateFormats';
import RoomInfo from '../components/RoomInfo.jsx';

const BookingModal = ( {room, hotel, userInfo, isBooking, onTimeChange, time,
                        onClose, onBook, moveInDate, moveOutDate, invalid,
                        pristine, submitting, totalPrice } ) => (
    <Modal
        isOpen={isBooking}
        onRequestClose={onClose}
        ariaHideApp={false}
    >
        <h2>Confirm booking</h2>
        <RoomInfo room={room}/>
        { moveInDate &&
            <div>
                <h3>Move in date: </h3>
                <p>{moveInDate.format(dateFormats.RESERVATION_DISPLAY_FORMAT)}</p>
            </div>
        }
        { moveOutDate &&
            <div>
                <h3>Move out date: </h3>
                <p>{moveOutDate.format(dateFormats.RESERVATION_DISPLAY_FORMAT)}</p>
            </div>
        }
        <form onSubmit={() => onBook(room.id)}>
            <Field name='name' label='Enter your full name:' component={InputField}
                validate={[isRequired, maxLength(40), minLength(5), isFullName()]}
            />
            <TimePicker
                onChange={onTimeChange}
                value={time}
            />
            <button type='submit'
                    disabled={invalid || pristine || submitting}>
                Confirm
            </button>
            <button onClick={onClose}>Cancel</button>
        </form>
    </Modal>
)

export default reduxForm({
    form: 'bookingForm'
})(BookingModal);

