import React from 'react';
import Modal from 'react-modal';

import RoomInfo from '../components/RoomInfo.jsx';

const BookingModal = ( {room, hotel, userInfo, isBooking,
                        onClose, onBook, moveInDate, moveOutDate } ) => (
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
                <p>{moveInDate.format('dddd, DD/MM/YYYY')}</p>
            </div>
        }
        { moveOutDate &&
            <div>
                <h3>Move out date: </h3>
                <p>{moveOutDate.format('dddd, DD/MM/YYYY')}</p>
            </div>
        }
        <button onClick={() => onBook(room.id)}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
    </Modal>
)

export default BookingModal;