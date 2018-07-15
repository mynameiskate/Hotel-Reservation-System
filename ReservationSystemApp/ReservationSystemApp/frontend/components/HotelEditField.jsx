import React from 'react';

const HotelEditField = ( { hotel, onSubmitClick, onCancelClick, isValid} ) => (
    <div key={hotel.hotelId}>                       
        <h2>{hotel.name}</h2>
        {<p>Stars: <input type='text' defaultValue={hotel.stars}/></p>}
        {<p>City: <input type ='text' 
                         defaultValue={hotel.location ? hotel.location.city : ''}/></p>}
        {<p>Address: <input type ='text' 
                            defaultValue={hotel.location ? hotel.location.address : ''}/></p>}
        <button type="submit" onClick={onSubmitClick}
                disabled={!isValid}>
                Submit
        </button>
        <button onClick={onCancelClick}>Cancel</button>
    </div>
)

export default HotelEditField;