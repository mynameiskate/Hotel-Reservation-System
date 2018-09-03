import React from 'react';
import { Link } from 'react-router-dom';

import HotelInfo from './HotelInfo';

const HotelList = ( { info, getDetailsLink, imageLinkCreator } ) => (
    <div className="hotelList">
        { Array.isArray(info) &&
            info.map((hotel) =>
            !hotel.isRemoved &&
                <div key={hotel.hotelId} className="hotelInfoBox">
                    <HotelInfo
                        hotel={hotel}
                        imageLink={(hotel.imageIds && hotel.imageIds.length)
                            ? imageLinkCreator(hotel.imageIds[0])
                            : null
                        }
                    />
                    <Link className="detailsBtn" to={getDetailsLink(hotel.hotelId)}>View details</Link>
                </div>
        )}
    </div>
)

export default HotelList;
