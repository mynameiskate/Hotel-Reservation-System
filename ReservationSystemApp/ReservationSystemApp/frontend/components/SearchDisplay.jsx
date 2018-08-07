import React from 'react';
import { connect } from 'react-redux'; 
import HotelActions from '../actions/HotelActions';
import HotelList from './HotelList.jsx';

class SearchDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.sendRemoveRequest = this.sendRemoveRequest.bind(this);
        this.sendEditRequest = this.sendEditRequest.bind(this);
        this.hideHotel = this.hideHotel.bind(this); 
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
        const { info, error, isLoading, removing, resultCount } = this.props;
    	return ( 
	        <div className='searchPage'>
                 { isLoading && <h3>Loading hotels..</h3> }
                 { resultCount ?
                    <div>
                        <h3> Search results: {resultCount} destination(s)</h3>
                        <HotelList  info={info}
                                    removing={removing}
                                    onDeleteClick={this.sendRemoveRequest}
                                    onEditClick={this.sendEditRequest}
                        /> 
                    </div>
                    : <h3>No results, try again?</h3>
                 }
                 { error  && <h3>Loading error</h3>}
	        </div>
	    );
    } 
}

const mapStateToProps = (state) => {
    return {
        info: state.search.info,
        error: state.search.error,
        isLoading: state.search.isLoading,
        removing: state.hotels.removing,
        selected: state.hotels.selected,
        resultCount: state.search.resultCount
    }
}

export default connect(mapStateToProps)(SearchDisplay); 