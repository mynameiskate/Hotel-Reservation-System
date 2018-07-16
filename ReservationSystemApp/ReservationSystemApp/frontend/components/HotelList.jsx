import React from 'react';
import { Link, Route, Switch } from "react-router-dom";
import HotelInfo from "./HotelInfo.jsx";

const HotelList = ( {info, removing, onDeleteClick, onViewClick} ) => (
    <div>
        {info.map((hotel) =>
            !hotel.isRemoved && 
                <div key={hotel.hotelId}>
                    <HotelInfo hotel={hotel}/> 
                    {removing && <h3>Removing...</h3>}      
                    <button onClick={() =>  onDeleteClick(hotel.hotelId)}>Delete</button>
                    <Link to={`/hotels/${hotel.hotelId}`}
                          onClick={() => onViewClick(hotel.hotelId, hotel)}>
                          View details
                    </Link>  
                </div>                        
        )}
    </div>
)

export default HotelList