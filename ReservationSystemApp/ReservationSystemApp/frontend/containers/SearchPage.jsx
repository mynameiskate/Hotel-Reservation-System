import React from 'react';
import { connect } from 'react-redux'; 
import HotelActions from '../actions/HotelActions';
import HotelList from '../components/HotelList.jsx';
import { Link } from 'react-router-dom';
import { links } from '../config/links.js';

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.sendRemoveRequest = this.sendRemoveRequest.bind(this);
        this.sendEditRequest = this.sendEditRequest.bind(this);
        this.hideHotel = this.hideHotel.bind(this); 
    }

    componentDidMount() {
        this.props.dispatch(HotelActions.getHotelPage(this.props.currentPage));
    }

    sendRemoveRequest = (id) => {
        this.props.dispatch(HotelActions.removeHotel(id));
    }

    sendEditRequest = (id, info) => {
        this.props.dispatch(HotelActions.editHotel(id, info));
    }

    hideHotel = (info) => {
        this.props.dispatch(HotelActions.hideHotel(info));
    }

    render() {
    	const { info, error, isSent, removing, currentPage } = this.props;
    	return ( 
	        <div className='searchPage'>
                 { isSent ? <h3>Loading hotels..</h3>
                          : <h3> Search results </h3>}
                 { info &&
                    <HotelList  info={info}
                                removing={removing}
                                onDeleteClick={this.sendRemoveRequest}
                                onEditClick={this.sendEditRequest}
                    /> 
                 }
                 <p>{currentPage}</p>
                 { error  && <h3>Loading error</h3>}
	        </div>
	    );
    } 
}

const mapStateToProps = (state) => {
    return {
        currentPage: state.hotels.currentPage,
        info: state.hotels.info,
        error: state.hotels.error,
        isSent: state.hotels.isSent,
        removing: state.hotels.removing,
        selected: state.hotels.selected  
    }
}

export default connect(mapStateToProps)(SearchPage); 