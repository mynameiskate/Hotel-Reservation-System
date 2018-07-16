import React from 'react';
import { connect } from 'react-redux'; 
import { hotelActions } from '../actions/hotelActions.js';
import HotelList from '../components/HotelList.jsx';

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

    sendRemoveRequest = (id) => {
        this.props.dispatch(hotelActions.removeHotel(id));
    }

    sendEditRequest = (id, info) => {
        this.props.dispatch(hotelActions.editHotel(id, info));
    }

    showHotel = (id, info) => {
        this.props.dispatch(hotelActions.showHotel(id, info));
    }

    hideHotel = (info) => {
        this.props.dispatch(hotelActions.hideHotel(info));
    }

    render() {
    	const { info, error, isSent, removing } = this.props;
    	return ( 
	        <div className="mainPage">
	        	 <h1>Welcome to hotel reservation system</h1>
	        	 { isSent && <h3>Loading hotels..</h3>}
                 { info &&
                    <HotelList  info={info}
                                removing={removing}
                                onDeleteClick={this.sendRemoveRequest}
                                onViewClick={this.showHotel}
                                onEditClick={this.sendEditRequest}
                    /> 
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
        selected: state.hotels.selected  
    }
}

export default connect(mapStateToProps)(Main); 