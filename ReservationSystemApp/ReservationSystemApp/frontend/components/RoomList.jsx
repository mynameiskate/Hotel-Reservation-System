import React from 'react';
import RoomInfo from './RoomInfo.jsx';

const RoomList = ( {info} ) => (
    <div>
        { Array.isArray(info) && 
            info.map((room) =>
            <div key={room.number}>
                <RoomInfo room={room}/>
            </div>
        )}
    </div>
)

export default RoomList;