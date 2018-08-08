import React from 'react';

const RoomInfo = ( {room} ) => (
    room ?
        <div>                       
            {room.number && <li>Room number: {room.number}</li> }
            {room.roomType && <li>Room type: {room.roomType}</li>}
            {room.cost && <li>Cost per night: {room.cost}</li>}
            {room.canPlace && <li>For {room.canPlace}</li>}
        </div>
    : null
) 

export default RoomInfo;