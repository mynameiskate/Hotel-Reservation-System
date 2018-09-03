import React from 'react';
import { Link } from 'react-router-dom';

import HotelInfo from './HotelInfo';

const HotelEditList = ( { info, removing, onDeleteClick, getDetailsLink,
                          getEditLink, imageLinkCreator, newHotelLink } ) => (
    <div>
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
                    {removing && <h3>Removing...</h3>}
                    <div className="btnBox">
                        <button className="detailsBtn"
                            onClick={() =>  onDeleteClick(hotel.hotelId)}>
                            Delete
                        </button>
                        <Link className="detailsBtn" to={getDetailsLink(hotel.hotelId)}>View rooms</Link>
                        <Link className="detailsBtn" to={getEditLink(hotel.hotelId)}>Edit</Link>
                        <Link className="detailsBtn" to={newHotelLink}>Add new hotel</Link>
                    </div>
                </div>
        )}
    </div>
)

export default HotelEditList;