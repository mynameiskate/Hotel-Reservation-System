import React from 'react';
import { Link } from 'react-router-dom';

const TopHotelList = ( { info, getDetailsLink, imageLinkCreator } ) => (
    <div className="topHotels">
        <p className="topHotelsTitle">Top Hotels</p>
        <div className="topHotelsRow">
        { Array.isArray(info) &&
            info.map((hotel) =>
                !hotel.isRemoved &&  
                    <div className="hotelCard">
                        <div className="topHotelImg">
                            {
                                (hotel.imageIds && hotel.imageIds.length)
                                ? <img src={imageLinkCreator(hotel.imageIds[0])}/>
                                : null
                            }
                        </div>
                            <p className="topHotelTitle">{hotel.name}</p>
                            <button className="hotelViewBtn">View</button>
                    </div>)
        }
        </div>
    </div>
)

export default TopHotelList;