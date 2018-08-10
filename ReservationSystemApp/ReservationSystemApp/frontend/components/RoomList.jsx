import React from 'react';
import RoomInfo from './RoomInfo.jsx';

const RoomList = ( {info, showBookModal, bookingLink} ) => (
    <div>
        { Array.isArray(info) &&
            info.map((room) =>
            <div key={room.number}>
                <RoomInfo room={room}/>
                <button onClick={() => showBookModal(room)}>Book!</button>
            </div>
        )}
    </div>
)

export default RoomList;