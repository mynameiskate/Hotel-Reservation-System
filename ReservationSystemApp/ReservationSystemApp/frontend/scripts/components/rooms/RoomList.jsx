import React from 'react';
import RoomInfo from './RoomInfo';

const RoomList = ( {info, showBookModal, isBookingEnabled, imageLinkCreator } ) => (
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