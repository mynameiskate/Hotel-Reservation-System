import React from 'react';
import { Link } from 'react-router-dom';

import HotelInfo from './HotelInfo';

const HotelList = ( { info, getDetailsLink, imageLinkCreator } ) => (
    <div>
        { Array.isArray(info) &&
            info.map((hotel) =>
            !hotel.isRemoved &&
                <div key={hotel.hotelId}>
                    <HotelInfo
                        hotel={hotel}
                        imageLink={(hotel.imageIds && hotel.imageIds.length)
                            ? imageLinkCreator(hotel.imageIds[0])
                            : null
                        }
                    />
                    <Link to={getDetailsLink(hotel.hotelId)}>View details</Link>
                </div>
        )}
    </div>
)

export default HotelList;
