import React from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import { links } from '../config/links';
import  HotelActions from '../actions/HotelActions.js';
import  HotelSearchActions from '../actions/HotelSearchActions.js';
import  HotelFilter  from '../components/HotelFilter.jsx';
import  PageBar  from '../components/PageBar.jsx';
import SearchDisplay from './SearchDisplay.jsx';

class HotelSearchPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getLocations();
        this.props.getHotelPage(this.props.search);
    }

    componentWillReceiveProps(nextProps) {
        const query = nextProps.search;
        this.props.syncParamsWithQuery(query);
    }

    componentDidUpdate(prevProps) {
        if (this.props.search !== prevProps.search) {
            this.props.getHotelPage(this.props.search);
        }
    }

    resetFilters = () => {
        this.props.buildQuery();
    }

    setCountry = (country) => {
        const { hotelName, moveInDate, moveOutDate, adults } = this.props;
        this.props.buildQuery(country.value, null, hotelName, moveInDate, moveOutDate, adults);
    }

    setCity = (city) => {
        const { selectedCountry, hotelName, moveInDate, moveOutDate, adults } = this.props;
        this.props.buildQuery(selectedCountry, city.value, hotelName, moveInDate, moveOutDate, adults);
    }

    setPage = (page) => {
        const {selectedCountry, selectedCity, hotelName, moveInDate, moveOutDate, adults} = this.props;
        this.props.buildQuery(selectedCountry, selectedCity, hotelName, moveInDate, moveOutDate, adults, page);
    }

    setHotelName = (hotelName) => {
        const {selectedCountry, selectedCity, moveInDate, moveOutDate, adults } = this.props;
        this.props.buildQuery(selectedCountry, selectedCity, hotelName, moveInDate, moveOutDate, adults);
    }

    setMoveInDate = (moveInDate) => {
        const { hotelName, selectedCountry, selectedCity, moveOutDate, adults } = this.props;
        this.props.buildQuery(selectedCountry, selectedCity, hotelName, moveInDate, moveOutDate, adults);
    }

    setMoveOutDate = (moveOutDate) => {
        const { hotelName, selectedCountry, selectedCity, moveInDate, adults } = this.props;
        this.props.buildQuery(selectedCountry, selectedCity, hotelName, moveInDate, moveOutDate, adults);
    }

    setAdults = (adults) => {
        const { hotelName, selectedCountry, selectedCity, moveInDate, moveOutDate } = this.props;
        this.props.buildQuery(selectedCountry, selectedCity, hotelName, moveInDate, moveOutDate, adults);
    }

    parseDate = (date) => {
        return moment(date);
    }

    render() {
        const { selectedCountry, selectedCity, locations, dateError,
                page, pageCount, nextPage, moveInDate, moveOutDate,
                isLoading, adults } = this.props;
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
                              adultsAmount={adults}
                              onAdultsChange={this.setAdults}
                              setMoveInDate={this.setMoveInDate}
                              setMoveOutDate={this.setMoveOutDate}
                              dateError={dateError}
                />
                <SearchDisplay/>
               { (pageCount > 0 && !isLoading) &&
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
        adults: state.rooms.adults,
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

const mapDispatchToProps = (dispatch) => {
    return {
        syncParamsWithQuery: (query) => {
            dispatch(HotelSearchActions.syncParamsWithQuery(query));
        },

        getLocations: () => {
            dispatch(HotelActions.getLocations());
        },

        buildQuery: (selectedCountry, selectedCity, hotelName,
            moveInDate, moveOutDate, adults, page = 1) => {
            dispatch(HotelSearchActions.buildQuery(
                links.HOTEL_SEARCH_PAGE,
                selectedCountry, selectedCity,
                hotelName, moveInDate, moveOutDate, adults, page)
            );
        },

        getHotelPage: (search) => {
            dispatch(HotelSearchActions.loadFromQuery(search));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HotelSearchPage);