import React from 'react';

const RoomInfo = ( { room, imageLink } ) => (
    room ?
        <div className="roomCard">
            <div className="roomImg" >
                { imageLink && <img src={imageLink}/>}
            </div>
            <div className="roomInfo">
                <p>{room.number ? `Room No.${room.number}` : "Room information"}</p>
                    <ul>
                        {room.number && <li>Room number: {room.number}</li> }
                        {room.roomType && <li>Room type: {room.roomType}</li>}
                        {room.cost && <li>Cost per night: {room.cost}</li>}
                        {room.canPlace && <li>For {room.canPlace}</li>}
                    </ul>
            </div>
        </div>
    : null
)

export default RoomInfo;

/*        <div class="roomCard">
                <div class="roomImgInfo">
                    <div class="roomImg">
                        <img src="hotel1.jpg">
                    </div>
                    <div class="roomInfo">
                        <p class="roomTitle">Room Information</p>
                        <ul>
                            <li>- kate loh</li>
                            <li>- kate durashka</li>
                            <li>- smth else</li>
                        </ul>
                    </div>
                </div>
                <div class="bookBtn">Book</div>
            </div>*/