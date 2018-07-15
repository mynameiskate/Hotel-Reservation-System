import React from 'react';

const HotelEditField = ( { hotel, onSubmitClick} ) => (
    <div key={hotel.hotelId}>                       
        <h2>{hotel.name}</h2>
        {hotel.stars && <p>Stars: <input type='text' defaultValue={hotel.stars}/></p>}
        {hotel.location && <p>City: <input type ='text' defaultValue={hotel.location.city}/></p>}
        {hotel.location && <p>Address: <input type ='text' defaultValue={hotel.location.address}/></p>}
        <button onClick={onSubmitClick}>Submit</button>
    </div>
)

export default HotelEditField;