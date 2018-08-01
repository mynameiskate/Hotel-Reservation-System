import React from 'react';
import { connect } from 'react-redux';
import SearchContainer from './SearchContainer.jsx';
import  HotelActions from '../actions/HotelActions.js';
import { links } from '../config/links.js';

class HotelSearchPage extends React.Component {
    constructor(props) {
        super(props);
    }

    getPageId() {
        return this.props.match.params.id;
    }

    getHotelPage = (page, options) => {
        this.props.dispatch(HotelActions.getHotelPage(page, options));
    }

    updateHotelPage = (prevProps) => {
        this.props.dispatch(HotelActions.updateHotelPage(prevProps));
    }

    sendSearchRequest = (page, options) => {
        this.props.history.push(links.HOTEL_ID_SEARCH_PAGE(page));
        this.getHotelPage(page, options);
    }
    
    componentDidMount() {
        this.getHotelPage(this.getPageId());
    }

    componentDidUpdate(prevProps) {       
        this.updateHotelPage(prevProps);     
    }

    render() {
    	return ( 
            <SearchContainer sendSearchRequest={this.sendSearchRequest}/>
	    );
    } 
}

const mapStateToProps = (state) => {
    return {
        currentPage: state.hotels.currentPage,
        filters: state.hotels.filters
    }
}

export default connect(mapStateToProps)(HotelSearchPage); 