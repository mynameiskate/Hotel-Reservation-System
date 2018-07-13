import React from 'react';
import { connect } from 'react-redux'; 
import { hotelActions } from '../actions/hotelActions.js';
import HotelInfo from '../components/HotelInfo.jsx';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.sendRemoveRequest = this.sendRemoveRequest.bind(this);
        this.sendEditRequest = this.sendEditRequest.bind(this);
        this.showHotel = this.showHotel.bind(this);
        this.hideHotel = this.hideHotel.bind(this); //this.hideHotel = ::this.hideHotel()
    }

    componentWillMount() {
        this.props.dispatch(hotelActions.findAll());
    }

    sendRemoveRequest(id) {
        return () => this.props.dispatch(hotelActions.removeHotel(id));
    }

    sendEditRequest(id, info) {
        return () => this.props.dispatch(hotelActions.editHotel(id, info));
    }

    showHotel(info) {
        return () => this.props.dispatch(hotelActions.showHotel(info));
    }

    hideHotel(info) {
        return () => this.props.dispatch(hotelActions.hideHotel(info));
    }

    render() {
    	const { info, error, isSent, removing } = this.props;
    	return ( 
	        <div>
	        	 <h1>Welcome to hotel reservation system</h1>
	        	 { isSent && <h3>Loading hotels..</h3>}
	        	 { info &&
	        	 	<ul>
                        {info.map((hotel) =>
                            !hotel.isRemoved && 
                            <div key={hotel.hotelId}>
                                <HotelInfo hotel={hotel}
                                           onDeleteClick={this.sendRemoveRequest(hotel.hotelId)}
                                           onShowClick={this.showHotel(hotel)}
                                           onEditClick={this.sendEditRequest()}
                                /> 
                                {removing && <h3>Removing...</h3>}              
                            </div>                        
                        )}
                    </ul>
	        	 }
	        	 { error  && <h3>Loading error</h3>}
	        </div>
	    );
    } 
}

const mapStateToProps = (state) => {
    return {
        info: state.hotels.info,
        error: state.hotels.error,
        isSent: state.hotels.isSent,
        removing: state.hotels.removing,
        hotelInfo: state.hotels.hotelInfo
    }
}

export default connect(mapStateToProps)(Main); 