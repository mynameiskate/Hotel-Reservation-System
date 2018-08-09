import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import queryString from 'query-string';

import moment from 'moment';
import {change } from 'redux-form';
import { links } from '../config/links';
import  HotelActions from '../actions/HotelActions.js';
import  HotelSearchActions from '../actions/HotelSearchActions.js';
import  HotelFilter  from '../components/HotelFilter.jsx';
import  PageBar  from '../components/PageBar.jsx';
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
        const moveInDate = this.stringToMoment(params.moveInDate);
        const moveOutDate = this.stringToMoment(params.moveOutDate);


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

        if (moveOutDate && !moveOutDate.isSame(this.props.moveOutDate))  {
            this.props.dispatch(HotelSearchActions.setMoveOutDate(moveOutDate));
        }

        if (moveInDate && !moveInDate.isSame(this.props.moveInDate)) {
            this.props.dispatch(HotelSearchActions.setMoveInDate(moveInDate));
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
        const { hotelName, moveInDate, moveOutDate} = this.props;
        this.buildQuery(country.value, null, hotelName, moveInDate, moveOutDate);
    }

    setCity = (city) => {
        const { selectedCountry, hotelName, moveInDate, moveOutDate } = this.props;
        this.buildQuery(selectedCountry, city.value, hotelName, moveInDate, moveOutDate);
    }

    setPage = (page) => {
        const {selectedCountry, selectedCity, hotelName, moveInDate, moveOutDate} = this.props;
        this.buildQuery(selectedCountry, selectedCity, hotelName, moveInDate, moveOutDate, page);
    }

    setHotelName = (hotelName) => {
        const {selectedCountry, selectedCity, moveInDate, moveOutDate } = this.props;
        this.buildQuery(selectedCountry, selectedCity, hotelName, moveInDate, moveOutDate);
    }

    setMoveInDate = (moveInDate) => {
        const { hotelName, selectedCountry, selectedCity, moveOutDate } = this.props;
        this.buildQuery(selectedCountry, selectedCity, hotelName, moveInDate, moveOutDate);
    }

    setMoveOutDate = (moveOutDate) => {
        const { hotelName, selectedCountry, selectedCity, moveInDate } = this.props;
        this.buildQuery(selectedCountry, selectedCity, hotelName, moveInDate, moveOutDate);
    }

    buildQuery = (selectedCountry, selectedCity, hotelName, moveInDate, moveOutDate, page = 1) => {
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

        if (moveInDate) {
            params.moveInDate = moveInDate.format('YYYY/MM/DD');
        }

        if (moveOutDate) {
            if (!moveOutDate.isBefore(moveInDate)) {
                params.moveOutDate = moveOutDate.format('YYYY/MM/DD');
            }
            else {
                this.props.dispatch(HotelSearchActions.setDateFailure(moveOutDate));
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
                page, pageCount, nextPage, moveInDate, moveOutDate } = this.props;
        return(
            <div>
                <HotelFilter onCancel = {this.resetFilters}
                              locations={locations}
                              selectedCountry={selectedCountry}
                              selectedCity={selectedCity}
                              onCountrySelect={this.setCountry}
                              onCitySelect={this.setCity}
                              onNameChange={this.setHotelName}
                              moveInDate={moveInDate}
                              moveOutDate={moveOutDate}
                              setMoveInDate={this.setMoveInDate}
                              setMoveOutDate={this.setMoveOutDate}
                              dateError={dateError}
                />

                <SearchDisplay/>
               { (pageCount > 0) &&
                    <PageBar  currentPage={page}
                              nextPage={nextPage}
                              goToPage={this.setPage}/>
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
        moveInDate: state.search.moveInDate,
        moveOutDate: state.search.moveOutDate
    }
}

export default connect(mapStateToProps)(HotelSearchPage);