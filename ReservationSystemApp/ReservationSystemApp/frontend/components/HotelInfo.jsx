import React from 'react';
import { Link} from "react-router-dom";


const HotelInfo = ( {hotel} ) => (
    <div>                       
        <h2>{hotel.name}</h2>
        {hotel.stars && <li>Stars: {hotel.stars}</li>}
        {hotel.location && <li>City: {hotel.location.city}</li>}
        {hotel.location && <li>Location: {hotel.location.address}</li>} 
    </div>
) 

export default HotelInfo