import React from 'react';
import ReactDOM from 'react-dom';
import { hotelContainer } from '../../actionContainers/hotelActionContainers.js'
import { connect } from 'react-redux';


class Main extends React.Component {
    componentWillMount() {
        this.props.dispatch(hotelContainer.findHotels());
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
                            <div key={hotel.hotelId}>
                                <h2>{hotel.name}</h2>
                                {hotel.stars && <li>Stars: {hotel.stars}</li>}
                                {hotel.location && <li>Location: {hotel.location}</li>}
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
        isSent: state.hotels.isSent
    }
}

export default connect(mapProps)(Main);