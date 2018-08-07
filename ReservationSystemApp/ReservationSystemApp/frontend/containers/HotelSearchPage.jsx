import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import queryString from 'query-string';

import moment from 'moment';
import {change } from 'redux-form';
import { links } from '../config/links';
import  HotelActions from '../actions/HotelActions.js';
import  HotelSearchActions from '../actions/HotelSearchActions.js';
import  SearchFilter  from '../components/SearchFilter.jsx';
import  HotelPageBar  from '../components/HotelPageBar.jsx';
import SearchDisplay from '../components/SearchDisplay.jsx';

class HotelSearchPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(HotelActions.getLocations());
        this.getHotelPage();
    }

    componentWillReceiveProps(nextProps) {
        const query = nextProps.search;
        const params = queryString.parse(query);
        const moveInTime = this.stringToMoment(params.moveInTime);
        const moveOutTime = this.stringToMoment(params.moveOutTime);


        if (this.props.selectedCountry !== params.countryId) {
            this.props.dispatch(HotelSearchActions.setCurrentCountry(params.countryId));
        }

        if (this.props.selectedCity !== params.city) {
            this.props.dispatch(HotelSearchActions.setCurrentCity(params.city));
        }

        if (nextProps.page && this.props.page !== params.page) {
            this.props.dispatch(HotelSearchActions.setCurrentPage(params.page));
        }

        if (this.props.hotelName != params.name) {
            this.props.dispatch(HotelSearchActions.setCurrentHotelName(params.name));
            this.props.dispatch(change('searchFilterForm', 'name', params.name || ''));
        }

        if (moveInTime && !moveInTime.isSame(this.props.moveInTime)) {
            this.props.dispatch(HotelSearchActions.setMoveInTime(moveInTime));
        }

        if (moveOutTime && !moveOutTime.isSame(this.props.moveOutTime))  {
            this.props.dispatch(HotelSearchActions.setMoveOutTime(moveOutTime));         
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.search !== prevProps.search) {
            this.getHotelPage();
        } 
    }

    stringToMoment = (strDate) => {
        let date =  strDate ? moment(strDate, 'YYYY/MM/DD') : null;
        return date;
    }
    

    getHotelPage = () => {
        this.props.dispatch(HotelSearchActions.loadFromQuery(this.props.search));
    }

    resetFilters = () => {
        this.buildQuery();
    }

    setCountry = (country) => {
        const { hotelName, moveInTime, moveOutTime} = this.props;
        this.buildQuery(country.value, null, hotelName, moveInTime, moveOutTime);
    }

    setCity = (city) => {
        const { selectedCountry, hotelName, moveInTime, moveOutTime } = this.props;
        this.buildQuery(selectedCountry, city.value, hotelName, moveInTime, moveOutTime);
    }

    setPage = (page) => {
        const {selectedCountry, selectedCity, hotelName, moveInTime, moveOutTime} = this.props;
        this.buildQuery(selectedCountry, selectedCity, hotelName, moveInTime, moveOutTime, page);
    }

    setHotelName = (hotelName) => {
        const {selectedCountry, selectedCity, moveInTime, moveOutTime } = this.props;
        this.buildQuery(selectedCountry, selectedCity, hotelName, moveInTime, moveOutTime);
    }

    setMoveInTime = (moveInTime) => {
        const { hotelName, selectedCountry, selectedCity, moveOutTime } = this.props;
        this.buildQuery(selectedCountry, selectedCity, hotelName, moveInTime, moveOutTime);
    }

    setMoveOutTime = (moveOutTime) => {
        const { hotelName, selectedCountry, selectedCity, moveInTime } = this.props;
        this.buildQuery(selectedCountry, selectedCity, hotelName, moveInTime, moveOutTime);
    }

    buildQuery = (selectedCountry, selectedCity, hotelName, moveInTime, moveOutTime, page = 1) => {
        const params = {
            page
        };

        if (selectedCountry) {
            params.countryId = selectedCountry;
        }

        if (selectedCity) {
            params.city = selectedCity;
        }

        if (hotelName) {
            params.name = hotelName;
        }

        if (moveInTime) {
            params.moveInTime = moveInTime.format('YYYY/MM/DD');
        }  

        if (moveOutTime) {
            if (!moveOutTime.isBefore(moveInTime)) {
                params.moveOutTime = moveOutTime.format('YYYY/MM/DD');
            }
            else {
                this.props.dispatch(HotelSearchActions.setDateFailure(moveOutTime));
            }
        }

        const query = queryString.stringify(params);
        this.props.dispatch(push(`${links.HOTEL_SEARCH_PAGE}?${query}`));
    }

    parseDate = (date) => {
        return moment(date);
    }

    render() {
        const { selectedCountry, selectedCity, locations, dateError,
                page, pageCount, nextPage, moveInTime, moveOutTime } = this.props;
        return(
            <div>
                <SearchFilter onCancel = {this.resetFilters}
                              locations={locations}
                              selectedCountry={selectedCountry}
                              selectedCity={selectedCity}
                              onCountrySelect={this.setCountry}
                              onCitySelect={this.setCity}
                              onNameChange={this.setHotelName}
                              moveInTime={moveInTime}
                              moveOutTime={moveOutTime}
                              setMoveInTime={this.setMoveInTime}
                              setMoveOutTime={this.setMoveOutTime}
                              dateError={dateError}
                />

                <SearchDisplay/>
               { (pageCount > 0) &&
                    <HotelPageBar  currentPage={page} 
                                   nextPage={nextPage}/>
                }
            </div>
	    );
    } 
}

const mapStateToProps = (state) => {
    return {
        hotelName: state.search.hotelName,
        search: state.router.location.search,
        info: state.search.info,
        error: state.search.error,
        dateError: state.search.dateError,
        isLoading: state.search.isLoading,
        locations: state.hotels.locations,
        selectedCountry: state.search.selectedCountry,
        selectedCity: state.search.selectedCity,
        resultCount: state.search.resultCount,
        pageSize: state.search.pageSize,
        nextPage: state.search.nextPage,
        pageCount: state.search.pageCount,
        page: state.search.page,
        moveInTime: state.search.moveInTime,
        moveOutTime: state.search.moveOutTime
    }
}

export default connect(mapStateToProps)(HotelSearchPage); 