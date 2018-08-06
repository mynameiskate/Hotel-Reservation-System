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

        if (this.props.startDate != params.startDate) {
            this.props.dispatch(HotelSearchActions.setStartDate(params.startDate));
        }

        if (this.props.endDate != params.endDate) {
            this.props.dispatch(HotelSearchActions.setEndDate(params.endDate));
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.search !== prevProps.search) {
            this.getHotelPage();
        } 
    }

    getHotelPage = () => {
        this.props.dispatch(HotelSearchActions.loadFromQuery(this.props.search));
    }

    resetFilters = () => {
        this.buildQuery();
    }

    setCountry = (country) => {
        const { hotelName, startDate, endDate} = this.props;
        this.buildQuery(country.value, null, hotelName, startDate, endDate);
    }

    setCity = (city) => {
        const { selectedCountry, hotelName, startDate, endDate } = this.props;
        this.buildQuery(selectedCountry, city.value, hotelName, startDate, endDate);
    }

    setPage = (page) => {
        const {selectedCountry, selectedCity, hotelName, startDate, endDate} = this.props;
        this.buildQuery(selectedCountry, selectedCity, hotelName, startDate, endDate, page);
    }

    setHotelName = (hotelName) => {
        const {selectedCountry, selectedCity, startDate, endDate } = this.props;
        this.buildQuery(selectedCountry, selectedCity, hotelName, startDate, endDate);
    }

    setStartDate = (startDate) => {
        const { hotelName, selectedCountry, selectedCity, endDate } = this.props;
        this.buildQuery(selectedCountry, selectedCity, hotelName, startDate, endDate);
    }

    setEndDate = (endDate) => {
        const { hotelName, selectedCountry, selectedCity, startDate } = this.props;
        this.buildQuery(selectedCountry, selectedCity, hotelName, startDate, endDate);
    }

    buildQuery = (selectedCountry, selectedCity, hotelName, startDate, endDate, page = 1) => {
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

        if (startDate) {
            params.startDate = startDate;
        }

        if (endDate) {
            params.endDate = endDate;
        }

        const query = queryString.stringify(params);
        this.props.dispatch(push(`${links.HOTEL_SEARCH_PAGE}?${query}`));
    }

    parseDate = (date) => (
        moment(date, "YYYY-MM-DD")
    )

    render() {
        const { selectedCountry, selectedCity, locations, 
                page, pageCount, nextPage, startDate, endDate } = this.props;

        const start = this.parseDate(startDate);
        const end = this.parseDate(endDate);

        return(
            <div>
                <SearchFilter onCancel = {this.resetFilters}
                              locations={locations}
                              selectedCountry={selectedCountry}
                              selectedCity={selectedCity}
                              onCountrySelect={this.setCountry}
                              onCitySelect={this.setCity}
                              onNameChange={this.setHotelName}
                              startDate={start}
                              endDate={end}
                              setStartDate={this.setStartDate}
                              setEndDate={this.setEndDate}
                />

                <SearchDisplay/>
               { (pageCount > 0) &&
                    <HotelPageBar  currentPage={page} 
                                   nextPage={nextPage}
                                   goToPage={(num) => this.setPage(num)}/>
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
        isLoading: state.search.isLoading,
        locations: state.hotels.locations,
        selectedCountry: state.search.selectedCountry,
        selectedCity: state.search.selectedCity,
        resultCount: state.search.resultCount,
        pageSize: state.search.pageSize,
        nextPage: state.search.nextPage,
        pageCount: state.search.pageCount,
        page: state.search.page,
        startDate: state.search.startDate,
        endDate: state.search.endDate
    }
}

export default connect(mapStateToProps)(HotelSearchPage); 