import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { hotelActions } from '../actions/hotelActions.js';


class Main extends React.Component {

    constructor(props) {
        super(props);
        this.sendRemoveRequest = this.sendRemoveRequest.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(hotelActions.findAll());
    }

    sendRemoveRequest(id) {
        return () => this.props.dispatch(hotelActions.removeHotel(id));
    }

    render() {
    	const { info, error, isSent} = this.props;
    	return ( 
	        <div>
	        	 <h1>Welcome to hotel reservation system</h1>
	        	 { isSent && <h3>Loading hotels..</h3>}
	        	 { info &&
	        	 	<ul>
                        {info.map((hotel) =>
                            !hotel.isRemoved &&
                                <div key={hotel.hotelId}>
                                    <h2>{hotel.name}</h2>
                                    {hotel.stars && <li>Stars: {hotel.stars}</li>}
                                    {hotel.location && <li>City: {hotel.location.city}</li>}
                                    {hotel.location && <li>Location: {hotel.location.address}</li>}
                                    <button onClick={this.sendRemoveRequest(hotel.hotelId)}>Delete</button>
                                </div>
                        )}
                    </ul>
	        	 }
	        	 { error  && <h3>Loading error</h3>}
	        </div>
	    );
    } 
}

const mapProps = (state) => {
    console.log(state);
    return {
        info: state.hotels.info,
        error: state.hotels.error,
        isSent: state.hotels.isSent,
        removing: state.hotels.removing
    }
}

export default connect(mapProps)(Main);