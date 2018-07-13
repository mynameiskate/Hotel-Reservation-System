import React from 'react';
import { connect } from 'react-redux'; 
import { hotelActions } from '../actions/hotelActions.js';
import HotelEditField from '../components/HotelEditField.jsx';

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
    	const { info, error, isSent, editing, hotelInfo } = this.props;
    	return ( 
	        <div>
                {
                    hotelInfo && 
                    <div>
                        { isSent && <h3>Loading..</h3>}
                        <h2>{hotelInfo.name}</h2>
                            {
                                <HotelEditField key={hotelInfo.hotelId} hotel={hotelInfo}
                                    onSubmitClick={this.showEditField(hotelInfo.hotelId, hotelInfo)}
                                />
                            }
      
                    </div>
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
        hotelInfo: state.hotels.hotelInfo
    }
}

export default connect(mapStateToProps)(HotelPage); 