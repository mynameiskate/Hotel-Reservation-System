import React from 'react';
import { Link } from 'react-router-dom';
import HotelInfo from './HotelInfo.jsx';
import { links } from '../config/links.js';

const HotelList = ( {info, removing, onDeleteClick} ) => (
    <div>
        {info.map((hotel) =>
            !hotel.isRemoved && 
                <div key={hotel.hotelId}>
                    <HotelInfo hotel={hotel}/> 
                    {removing && <h3>Removing...</h3>}      
                    <button onClick={() =>  onDeleteClick(hotel.hotelId)}>Delete</button>
                    <Link to={ links.HOTEL_ID_PAGE(hotel.hotelId) } >
                          View details
                    </Link>  
                </div>                        
        )}
    </div>
)

export default HotelList;