import React from 'react';

const HotelInfo = ( { hotel, imageLink } ) => (
    <div>
        { imageLink && <img src={imageLink}/>}
        {hotel.name && <h2>{hotel.name}</h2>}
        {hotel.stars && <li>Stars: {hotel.stars}</li>}
        {hotel.location && <li>City: {hotel.location.city}</li>}
        {hotel.location && <li>Country: {hotel.location.country}</li>}
        {hotel.location && <li>Address: {hotel.location.address}</li>}
    </div>
)

export default HotelInfo;