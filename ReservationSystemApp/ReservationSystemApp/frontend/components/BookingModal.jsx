import React from 'react';
import Modal from 'react-modal';

import RoomInfo from '../components/RoomInfo.jsx';

const BookingModal = ( {room, hotel, userInfo, isBooking,
                        onClose} ) => (
    <Modal
        isOpen={isBooking}
        onRequestClose={onClose}
        ariaHideApp={false}
    >
        <h2>Confirm booking</h2>
        <RoomInfo room={room}/>
        <button onClick={onClose}>Cancel</button>
    </Modal>
) 

export default BookingModal;