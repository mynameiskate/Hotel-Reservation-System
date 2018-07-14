import React from 'react';
import { Link} from "react-router-dom";

const HotelInfo = ( {hotel} ) => (
    <div>                       
        <h2>{hotel.name}</h2>
        {hotel.stars && <li>Stars: {hotel.stars}</li>}
        {hotel.location && <li>City: {hotel.location.city}</li>}
        {hotel.location && <li>Location: {hotel.location.address}</li>}
        {/*
        <button onClick={this.sendRemoveRequest(hotel.hotelId)}>Delete</button>
        {removing && <h3>Removing...</h3>}
        <button>Edit</button>
        <Link to={`/hotels/${hotel.hotelId}`} onClick={this.showHotel(hotel)}>View details</Link>
        */}    
    </div>
) 

export default HotelInfo