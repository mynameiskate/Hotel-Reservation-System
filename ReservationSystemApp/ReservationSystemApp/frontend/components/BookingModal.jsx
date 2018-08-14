import React from 'react';
import Modal from 'react-modal';
import { reduxForm, Field } from 'redux-form';
import TimePicker from 'react-time-picker';
import moment from 'moment';

import Timer from '../components/Timer.jsx';
import CheckBox from './CheckBox';
import InputField from './InputField.jsx';
import { isRequired, maxLength, minLength, isFullName } from '../constants/validationRules.js';
import { dateFormats } from '../constants/dateFormats';
import RoomInfo from './RoomInfo.jsx';

const BookingModal = ( {room, isBooking, onTimeChange, time,
                        onClose, onBook, moveInDate, moveOutDate, invalid,
                        pristine, submitting, totalCost, services,
                        addService, removeService, onCancel, secondsLimit } ) => (
    <Modal
        isOpen={isBooking}
        onRequestClose={onClose}
        ariaHideApp={false}
    >
        <h2>Confirm booking</h2>
        <Timer
            expiryTime={moment().add(secondsLimit, 'seconds')}
            finishCallback={onCancel}
        />
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
        <form onSubmit={(e) => {
                e.preventDefault();
                onBook(time);
                onClose();
            }
        }>
            <Field name='name' label='Enter your full name:' component={InputField}
                validate={[isRequired, maxLength(40), minLength(5), isFullName()]}
            />
            <TimePicker
                onChange={onTimeChange}
                value={time}
            />
            { services &&
                <div>
                    <h3>Choose additional options:</h3>
                    {services.map(service =>
                        <CheckBox
                            label={service.name}
                            id={service.id}
                            addItem={() => addService(service)}
                            removeItem={() => removeService(service)}
                        />)
                    }
                </div>
            }
            {totalCost && <h3>Total cost: ${totalCost}</h3>}
            <button type='submit'
                    disabled={invalid || pristine || submitting}>
                Confirm
            </button>
            <button onClick={onCancel}>Cancel</button>
        </form>
    </Modal>
)

export default reduxForm({
    form: 'bookingForm'
})(BookingModal);

