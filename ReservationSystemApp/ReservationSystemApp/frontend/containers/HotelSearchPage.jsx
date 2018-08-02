import React from 'react';
import { connect } from 'react-redux';
import SearchContainer from './SearchContainer.jsx';
import  HotelActions from '../actions/HotelActions.js';

class HotelSearchPage extends React.Component {
    constructor(props) {
        super(props);
    }

    getHotelPage = (page, options) => {
        this.props.dispatch(HotelActions.getHotelPage(page, options));
    }

    updateHotelPage = (prevProps) => {
        this.props.dispatch(HotelActions.updateHotelPage(prevProps));
    }

    componentDidMount() {
        this.getHotelPage();
    }

    componentDidUpdate(prevProps) {       
        this.updateHotelPage(prevProps);     
    }

    render() {
    	return ( 
            <SearchContainer sendSearchRequest={this.getHotelPage}/>
	    );
    } 
}

const mapStateToProps = (state) => {
    return {
        page: state.hotels.page,
        filters: state.hotels.filters
    }
}


export default connect(mapStateToProps)(HotelSearchPage); 