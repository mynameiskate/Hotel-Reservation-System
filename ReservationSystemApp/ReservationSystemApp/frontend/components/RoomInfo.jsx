import React from 'react';

const RoomInfo = ( {room} ) => (
    <div>                       
        <h2>{room.number}</h2>
        {room.roomType && <li>Room type: {room.roomType}</li>}
        {room.cost && <li>Cost per night: {room.cost}</li>}
        {room.canPlace && <li>For {room.canPlace}</li>}
    </div>
) 

export default RoomInfo;