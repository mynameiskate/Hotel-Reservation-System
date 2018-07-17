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
        let url = this.props.location.pathname;
        return url.split("/").pop();
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
    	const { selected, error, isSent, editing } = this.props;
    	return ( 
	        <div>
                {
                    selected ?
                        <div>
                            {
                                !editing ?
                                <div>
                                    <HotelInfo hotel={selected}/> 
                                    <button onClick={() => this.showEditField(selected.id, selected)}>Edit</button>    
                                    
                                </div>
                                : <HotelEditField hotel={selected}
                                                  sendRequest={(values) => this.sendEditRequest(selected.hotelId, values)}
                                                  onCancelClick={this.hideEditField} />
                            }
                            {error && <p>error</p>}
                        </div>      
                    : <h2>Sorry, page is not available.</h2>  
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
        selected: state.hotels.selected,
    }
}

export default connect(mapStateToProps)(HotelPage); 