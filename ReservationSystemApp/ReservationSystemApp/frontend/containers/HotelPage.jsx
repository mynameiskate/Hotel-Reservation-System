import React from 'react';
import { connect } from 'react-redux'; 
import { hotelActions } from '../actions/hotelActions.js';
import HotelEditField from '../components/HotelEditField.jsx';
import HotelInfo from '../components/HotelInfo.jsx';

class HotelPage extends React.Component {

    constructor(props) {
        super(props);
        this.sendEditRequest = this.sendEditRequest.bind(this);
    }

    showEditField(id, info) {
        return () => this.props.dispatch(hotelActions.startEditing(id, info));
    }

    hideEditField(id, info) {
        return () => this.props.dispatch(hotelActions.stopEditing(id, info));
    }

    sendEditRequest(id, info) {
        return () => this.props.dispatch(hotelActions.editHotel(id, info));
    }

    render() {
    	const { selected, error, isSent, editing } = this.props;
    	return ( 
	        <div>
                {
                    selected ?
                        <HotelInfo hotel={selected}/> 
                        : <h2>Sorry, page is not available.</h2>            
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
        editing: state.hotels.editing,
        selected: state.hotels.selected
    }
}

export default connect(mapStateToProps)(HotelPage); 