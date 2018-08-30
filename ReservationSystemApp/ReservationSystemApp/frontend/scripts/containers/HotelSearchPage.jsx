import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { bindActionCreators } from 'redux';

import { links } from '../config/links';
import  HotelActions from '../actions/HotelActions';
import HistoryActions from '../actions/HistoryActions';
import  HotelSearchActions from '../actions/HotelSearchActions';
import  HotelFilter  from '../components/hotels/HotelFilter';
import  PageBar  from '../components/PageBar';
import HotelList from '../components/hotels/HotelList';
import RoomFilter from '../components/rooms/RoomFilter';

class HotelSearchPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.addRequiredParams(this.props.location.search);
    }

    componentDidMount() {
        this.props.getLocations();
        this.props.getHotelPage(this.props.location.search);
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

    getDetailsLink = (id) => {
        const { moveInDate, moveOutDate, adults } = this.props;
        return this.props.getDetailsLink(id, moveInDate, moveOutDate, adults);
    }

    render() {
        const { selectedCountry, selectedCity, locations, dateError,
                page, pageCount, nextPage, moveInDate, moveOutDate,
                isLoading, adults, resultCount, error, info } = this.props;
        return(
            <div className="hotelSearch">
                <HotelFilter
                    locations={locations}
                    selectedCountry={selectedCountry}
                    selectedCity={selectedCity}
                    onCountrySelect={this.setCountry}
                    onCitySelect={this.setCity}
                    onNameChange={this.setHotelName}
                />
                <RoomFilter
                    moveInDate={moveInDate}
                    moveOutDate={moveOutDate}
                    adultsAmount={adults}
                    onAdultsChange={this.setAdults}
                    setMoveInDate={this.setMoveInDate}
                    setMoveOutDate={this.setMoveOutDate}
                    dateError={dateError}
                />
                <button type="button" onClick={this.resetFilters} className="resetBtn">Reset filter</button>
               { isLoading ?
                        <h2>Loading hotels...</h2>
                  : ( resultCount ?
                    <div>
                        <h3> Search results: {resultCount} destination(s)</h3>
                        <HotelList
                            info={info}
                            getDetailsLink={(id) => this.getDetailsLink(id)}
                            imageLinkCreator={this.props.imageLinkCreator}
                        />
                    </div>
                      : error ? <h3>Loading error</h3>
                        : <h3>No results, try again?</h3>
                    )
                }
               { (pageCount > 0 && !isLoading) &&
                    <PageBar
                        currentPage={page}
                        nextPage={nextPage}
                        goToPage={this.setPage}
                    />
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        adults: state.rooms.adults,
        hotelName: state.search.hotelName,
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
        moveOutDate: state.search.moveOutDate,
        search: state.router.location.search
    }
}

const mapDispatchToProps = (dispatch) => {
    const bindedCreators = bindActionCreators({
        syncParamsWithQuery: (query) => HotelSearchActions.syncParamsWithQuery(query),

        getLocations: () => HotelActions.getHotelLocations(),

        buildQuery: (selectedCountry, selectedCity, hotelName, moveInDate, moveOutDate, adults, page = 1) => (
            HotelSearchActions.buildQuery(
                links.HOTEL_SEARCH_PAGE,
                selectedCountry,
                selectedCity,
                hotelName,
                moveInDate,
                moveOutDate,
                adults,
                page
            )
        ),
        getHotelPage: (search) => HotelSearchActions.loadFromQuery(search),
    }, dispatch);

    return {
        ...bindedCreators,
        getDetailsLink: (id, moveInDate, moveOutDate, adults) => {
            const query = HistoryActions.getQuery(moveInDate, moveOutDate, adults);
            return ({pathname: links.HOTEL_ID_PAGE(id), search: query});
        },

        imageLinkCreator: (imageId) => (
            links.IMAGE_DOWNLOAD_PATH(imageId)
        ),

        getCountryOptions: () => (
            SelectService.getOptions(locations, 'country', 'countryId')
        ),

        addRequiredParams: (search) => (
            HotelSearchActions.addRequiredParamsToQuery(links.HOTEL_SEARCH_PAGE, search)
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HotelSearchPage);