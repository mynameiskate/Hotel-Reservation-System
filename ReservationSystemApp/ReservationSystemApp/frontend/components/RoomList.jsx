import React from 'react';
import RoomInfo from './RoomInfo';

const RoomList = ( {info, showBookModal, isBookingEnabled } ) => (
    <div>
        { Array.isArray(info) &&
            info.map((room) =>
            <div key={room.number}>
                <RoomInfo room={room}/>
                <button
                    disabled={!isBookingEnabled}
                    onClick={() => showBookModal(room)}>
                    Book!
                </button>
            </div>
        )}
    </div>
)

export default RoomList;