import React from 'react';
import { Link } from 'react-router-dom';

import RoomInfo from './RoomInfo';

const RoomEditList = ( {info, getEditLink, onOpenImageModal} ) => (
    <div>
        { Array.isArray(info) &&
            info.map((room) =>
            <div key={room.number}>
                <RoomInfo room={room}/>
                <Link to={getEditLink(room.id)}>
                    Edit
                </Link>
                <button onClick={() => onOpenImageModal(room)}>Add photos</button>
            </div>
        )}
    </div>
)

export default RoomEditList;