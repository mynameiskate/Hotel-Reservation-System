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

    showEditField = (id, info) => {
        this.props.dispatch(hotelActions.startEditing(id, info));
    }

    hideEditField = (id, info) => {
        this.props.dispatch(hotelActions.stopEditing(id, info));
    }

    sendEditRequest = (id, info) => {
        this.props.dispatch(hotelActions.editHotel(id, info));
    }

    render() {
    	const { selected, error, isSent, editing, isValid } = this.props;
    	return ( 
	        <div>
                {
                    selected ?
                        <div>
                            {
                                !editing ?
                                <HotelInfo hotel={selected}/> 
                                : <HotelEditField hotel={selected}
                                                  onSubmitClick={this.sendEditRequest}
                                                  onCancelClick={this.hideEditField}
                                                  isValid={isValid}/>
                            }
                            <button onClick={() => this.showEditField(selected.id, selected)}>Edit</button>    
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
        isValid: state.hotels.isValid
    }
}

export default connect(mapStateToProps)(HotelPage); 