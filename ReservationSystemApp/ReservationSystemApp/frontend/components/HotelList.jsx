import React from 'react';
import { Link } from 'react-router-dom';

import HotelInfo from './HotelInfo';

const HotelList = ( { info, getDetailsLink } ) => (
    <div>
        { Array.isArray(info) &&
            info.map((hotel) =>
            !hotel.isRemoved &&
                <div key={hotel.hotelId}>
                    <HotelInfo hotel={hotel}/>
                    <Link to={getDetailsLink(hotel.hotelId)}>View details</Link>
                </div>
        )}
    </div>
)

export default HotelList;