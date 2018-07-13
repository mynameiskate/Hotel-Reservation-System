import React from 'react';
import { connect } from 'react-redux';
import { hotelActions } from '../actions/hotelActions.js';

class HotelPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const hotel = this.props.hotels.hotelInfo;
        return (
            <div>
                {hotel &&
                    <div key={hotel.hotelId}>
                        <h2>{hotel.name}</h2>
                        {hotel.stars && <li>Stars: {hotel.stars}</li>}
                        {hotel.location && <li>City: {hotel.location.city}</li>}
                        {hotel.location && <li>Location: {hotel.location.address}</li>}
                        <button>Edit</button>
                    </div>
                }
                {error && <h3>Loading error</h3>}
            </div>
        );
    }
}

const mapProps = (state) => {
    return {
        hotelInfo: state.hotels.hotelInfo
    }
}

export default connect(mapProps)(HotelPage);
