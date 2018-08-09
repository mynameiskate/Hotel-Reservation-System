import React from 'react';
import RoomInfo from './RoomInfo.jsx';
import { Link } from 'react-router-dom';

const RoomList = ( {info, showBookModal, bookingLink} ) => (
    <div>
        { Array.isArray(info) && 
            info.map((room) =>
            <div key={room.number}>
                <RoomInfo room={room}/>
                {/*<Link to={{ pathname: bookingLink(room.id), state: { isBooking: true }}}>Book!</Link>*/}
                <button onClick={() => showBookModal(room)}>Book!</button>
            </div>
        )}
    </div>
)

export default RoomList;