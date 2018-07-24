import React from 'react';
import { connect } from 'react-redux'; 
import { hotelActions } from '../actions/hotelActions.js';
import HotelEditField from '../components/HotelEditField.jsx';
import HotelInfo from '../components/HotelInfo.jsx';

class HotelPage extends React.Component {

    constructor(props) {
        super(props);
        this.sendEditRequest = this.sendEditRequest.bind(this);
        this.showHotel = this.showHotel.bind(this);
    }

    getHotelId() {
        return this.props.match.params.id;
    }

    showHotel = (id) => {
        this.props.dispatch(hotelActions.showHotel(id));
    }

    componentWillMount() {
       this.showHotel(this.getHotelId());
    }

    showEditField = (id, info) => {
        this.props.dispatch(hotelActions.startEditing(id, info));
    }

    hideEditField = (id, info) => {
        this.props.dispatch(hotelActions.stopEditing(id, info));
    }

    sendEditRequest(id, info) {
        this.props.dispatch(hotelActions.editHotel(id, info));
    }

    render() {
    	const { loaded, error, isSent, editing } = this.props;
    	return ( 
	        <div>
                {loaded &&              
                    <div>
                        {
                            !editing ?
                            <div>
                                <HotelInfo hotel={ loaded }/> 
                                <button onClick={() => this.showEditField(loaded.id, loaded )}>Edit</button>        
                            </div>
                            : <HotelEditField hotel={ loaded }
                                              sendRequest={(values) => this.sendEditRequest(loaded.hotelId, values)}
                                              onCancelClick={this.hideEditField} />
                        }
                        {error && <p>error</p>}
                    </div>          
                }
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
        loaded: state.hotels.loaded,
    }
}

export default connect(mapStateToProps)(HotelPage); 