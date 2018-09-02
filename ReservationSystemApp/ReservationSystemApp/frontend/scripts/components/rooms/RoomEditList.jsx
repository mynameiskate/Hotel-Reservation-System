import React from 'react';
import { Link } from 'react-router-dom';

import RoomInfo from './RoomInfo';

const RoomEditList = ( { info, getEditLink, imageLinkCreator } ) => (
    <React.Fragment>
        { Array.isArray(info) &&
            info.map((room) =>
            <div key={room.number} className="roomRow">
                <RoomInfo
                    room={room}
                    imageLink={(room.imageIds && room.imageIds.length)
                        ? imageLinkCreator(room.imageIds[0])
                        : null
                      }
                />
                <Link to={getEditLink(room.id)} className="detailsBtn">
                    Edit
                </Link>
            </div>
        )}
    </React.Fragment>
)

export default RoomEditList;