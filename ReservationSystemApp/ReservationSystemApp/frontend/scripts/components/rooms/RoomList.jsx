import React from 'react';
import RoomInfo from './RoomInfo';

const RoomList = ( {info, showBookModal, isBookingEnabled, imageLinkCreator } ) => (
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
                <button
                    className="bookBtn"
                    disabled={!isBookingEnabled}
                    onClick={() => showBookModal(room)}>
                    Book!
                </button>
            </div>
        )}
    </React.Fragment>
)

export default RoomList;