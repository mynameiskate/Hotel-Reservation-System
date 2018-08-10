import React from 'react';
import HotelInfo from './HotelInfo.jsx';

const HotelList = ( {info, removing, onDeleteClick, onViewDetailsClick} ) => (
    <div>
        { Array.isArray(info) &&
            info.map((hotel) =>
            !hotel.isRemoved &&
                <div key={hotel.hotelId}>
                    <HotelInfo hotel={hotel}/>
                    {removing && <h3>Removing...</h3>}
                    <button onClick={() =>  onDeleteClick(hotel.hotelId)}>Delete</button>
                    <button onClick={() => onViewDetailsClick(hotel.hotelId)}> View details</button>
                </div>
        )}
    </div>
)

export default HotelList;