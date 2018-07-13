import React from 'react';

const HotelEditField = ( { hotel, onSubmitClick} ) => (
    <div key={hotel.hotelId}>                       
        <h2>{hotel.name}</h2>
        {hotel.stars && <p>Stars: <input type='text' value={hotel.stars}/></p>}
        {hotel.location && <p>City: <input type ='text' value={hotel.location.city}/></p>}
        {hotel.location && <p>Address: <input type ='text' value={hotel.location.address}/></p>}
        <button onClick={onSubmitClick}>Submit</button>
    </div>
)

export default HotelEditField