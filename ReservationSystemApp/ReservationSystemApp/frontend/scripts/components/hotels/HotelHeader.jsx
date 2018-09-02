import React from 'react';

const HotelHeader = ( { hotel, imageLink } ) => (
    <React.Fragment>
        <div
            className="hotelHeader"
            style={{ backgroundImage: `url(${imageLink})` }}
        >
            <div className="nav"/>
            <div className="hotelName">{hotel.name}</div>
        </div>
        <div className="hotelInfo">
            <div className="mainInfo">
                {hotel.location &&
                    <div className="infoItem geo">
                        {hotel.location.city}
                    </div>
                }
                {hotel.stars &&
                    <div className="infoItem stars">
                        {hotel.stars}
                    </div>
                }
                {hotel.location &&
                    <div className="infoItem address">
                        {hotel.location.address}
                    </div>
                }
            </div>
        </div>
    </React.Fragment>
)

export default HotelHeader;