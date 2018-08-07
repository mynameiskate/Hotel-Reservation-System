import React from 'react';
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom';

import { links } from '../config/links.js';
import HotelActions from '../actions/HotelActions.js';
import HotelEditField from '../components/HotelEditField.jsx';
import HotelInfo from '../components/HotelInfo.jsx';
import RoomPage from './RoomPage.jsx';

class HotelInfoPage extends React.Component {
    constructor(props) {
        super(props);
    }

    getHotelId() {
        return this.props.match.params.id;
    }

    showHotel = (id) => {
        this.props.dispatch(HotelActions.showHotel(id));
    }

    componentWillMount() {
       this.showHotel(this.getHotelId());
    }

    showEditField = (id, info) => {
        this.props.dispatch(HotelActions.startEditing(id, info));
    }

    hideEditField = (id, info) => {
        this.props.dispatch(HotelActions.stopEditing(id, info));
    }

    sendEditRequest = (id, info) => {
        this.props.dispatch(HotelActions.editHotel(id, info));
    }

    render() {
        const { loaded, error, isLoading, editing } = this.props;
        const hotelId = this.getHotelId();

    	return ( 
	        <div>
                {loaded &&              
                    <div>
                        {
                            !editing ?
                            <div>
                                <HotelInfo hotel={ loaded }/> 
                                <button onClick={() => this.showEditField(loaded.id, loaded )}>Edit</button> 
                                <Link to={links.ROOM_ID_PAGE(hotelId)}> See available rooms </Link>
                                <RoomPage hotelId = {hotelId}/>      
                            </div>
                            :   <HotelEditField hotel={ loaded }
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
        isLoading: state.hotels.isLoading,
        editing: state.hotels.editing,
        loaded: state.hotels.loaded,
    }
}

export default connect(mapStateToProps)(HotelInfoPage); 