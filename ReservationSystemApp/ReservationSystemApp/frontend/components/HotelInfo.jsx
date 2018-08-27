import React from 'react';

const HotelInfo = ( { hotel, imageLink } ) => (
    <div className="searchResult">
        <div className="hotelImg">
                { imageLink && <img src={imageLink}/>}
        </div>
        <div className="hotelInfo">
                {hotel.name && <h2>{hotel.name}</h2>}
                {hotel.stars && <li>Stars: {hotel.stars}</li>}
                {hotel.location && <li>City: {hotel.location.city}</li>}
                {hotel.location && <li>Country: {hotel.location.country}</li>}
                {hotel.location && <li>Address: {hotel.location.address}</li>}
        </div>
    </div>
)

export default HotelInfo;