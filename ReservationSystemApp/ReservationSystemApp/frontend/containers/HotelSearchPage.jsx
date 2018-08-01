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

    getHotelPage = () => {
        this.props.dispatch(HotelActions.getHotelPage(this.getPageId()));
    }

    sendSearchRequest = (page, options) => {
        this.props.history.push(links.HOTEL_ID_SEARCH_PAGE(page));
        this.props.dispatch(HotelActions.getHotelPage(page, options));
    }
    
    componentDidMount() {
        this.getHotelPage(this.props.currentPage, this.props.filters);
    }

    componentDidUpdate(prevProps) {       
        const { currentPage } = this.props;
        const prevPage = prevProps ? prevProps.currentPage : null;
        if (currentPage && prevPage &&
            currentPage !== prevPage) {
            this.getHotelPage();
        }      
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