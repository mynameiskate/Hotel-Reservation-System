import React from 'react';
import { Link } from 'react-router-dom';

import RoomInfo from './RoomInfo';

const RoomEditList = ( {info, getEditLink, imageLinkCreator } ) => (
    <div>
        { Array.isArray(info) &&
            info.map((room) =>
            <div key={room.number}>
                <RoomInfo
                    room={room}
                    imageLink={(room.imageIds && room.imageIds.length)
                        ? imageLinkCreator(room.imageIds[0])
                        : null
                      }
                />
                <Link to={getEditLink(room.id)}>
                    Edit
                </Link>
            </div>
        )}
    </div>
)

export default RoomEditList;