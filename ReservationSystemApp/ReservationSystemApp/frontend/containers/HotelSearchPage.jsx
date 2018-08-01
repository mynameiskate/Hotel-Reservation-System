import React from 'react';
import { connect } from 'react-redux';
import SearchContainer from './SearchContainer.jsx';
import  HotelActions from '../actions/HotelActions.js';

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
    
    componentDidMount() {
        this.getHotelPage();
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
            <SearchContainer/>
	    );
    } 
}

const mapStateToProps = (state) => {
    return {
        currentPage: state.hotels.currentPage
    }
}

export default connect(mapStateToProps)(HotelSearchPage); 