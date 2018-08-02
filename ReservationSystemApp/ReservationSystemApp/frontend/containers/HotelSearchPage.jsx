import React from 'react';
import { connect } from 'react-redux';
import SearchContainer from './SearchContainer.jsx';
import  HotelActions from '../actions/HotelActions.js';
import  HotelSearchActions from '../actions/HotelSearchActions.js';
import QueryService from '../services/QueryService.js';

class HotelSearchPage extends React.Component {
    constructor(props) {
        super(props);
    }

    getHotelPage = () => {
        this.props.dispatch(HotelSearchActions.loadFromQuery(this.props.location.search));
    }

    goToPage = (page) => {
        const { pathname, search } = this.props.location;
        let newQuery = QueryService.addParameter('page', page, search, pathname);
        this.props.history.push(newQuery);
    }

    updateHotelPage = (prevProps) => {
        this.props.dispatch(HotelActions.updateHotelPage(prevProps));
    }

    componentWillReceiveProps(next) {
        console.log(next);
        this.getHotelPage();
    }

    componentDidMount() {
       this.getHotelPage();
    }

    /*componentDidUpdate(prevProps) {       
        this.updateHotelPage(prevProps);     
    }*/

    render() {
    	return ( 
            <SearchContainer sendSearchRequest={this.getHotelPage}
                             goToPage={this.goToPage}/>
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