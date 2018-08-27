import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { bindActionCreators } from 'redux';

import { links } from '../../config/links';
import  HotelActions from '../../actions/HotelActions';
import HistoryActions from '../../actions/HistoryActions';
import  HotelSearchActions from '../../actions/HotelSearchActions';
import  HotelFilter  from '../../components/HotelFilter';
import  PageBar  from '../../components/PageBar';
import HotelEditList from '../../components/HotelEditList';

class AdminPage extends React.Component {
    constructor(props) {
        super(props);
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
        const { hotelName } = this.props;
        this.props.buildQuery(country.value, null, hotelName);
    }

    setCity = (city) => {
        const { selectedCountry, hotelName } = this.props;
        this.props.buildQuery(selectedCountry, city.value, hotelName);
    }

    setPage = (page) => {
        const { selectedCountry, selectedCity, hotelName } = this.props;
        this.props.buildQuery(selectedCountry, selectedCity, hotelName, page);
    }

    setHotelName = (hotelName) => {
        const { selectedCountry, selectedCity } = this.props;
        this.props.buildQuery(selectedCountry, selectedCity, hotelName);
    }

    removeHotel = (hotelId) => {
        this.props.removeHotel(hotelId);
        this.setPage()
    };

    parseDate = (date) => {
        return moment(date);
    }

    render() {
        const { selectedCountry, selectedCity, locations, page,
                pageCount, nextPage, isLoading, resultCount,
                error, info } = this.props;
        return(
            <div>
                <Link to={links.HOTEL_CREATION_PAGE}>Add new hotel</Link>
                <div className="hotelSearch">
                    <HotelFilter
                        locations={locations}
                        selectedCountry={selectedCountry}
                        selectedCity={selectedCity}
                        onCountrySelect={this.setCountry}
                        onCitySelect={this.setCity}
                        onNameChange={this.setHotelName}
                    />
                    { isLoading ?
                                <h2>Loading hotels...</h2>
                        : ( resultCount ?
                            <div>
                                <h3> Search results: {resultCount} destination(s)</h3>
                                <HotelEditList
                                    info={info}
                                    getDetailsLink={this.props.getDetailsLink}
                                    getEditLink={this.props.getEditLink}
                                    onDeleteClick={this.removeHotel}
                                    imageLinkCreator={this.props.imageLinkCreator}
                                />
                            </div>
                            : error ? <h3>Loading error</h3>
                                : <h3>No results, try again?</h3>
                            )
                        }
                        { (pageCount > 0 && !isLoading) &&
                            <PageBar  currentPage={page}
                                    nextPage={nextPage}
                                    goToPage={this.setPage}/>
                        }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
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
        search: state.router.location.search
    }
}

const mapDispatchToProps = (dispatch) => {
    const bindedCreators = bindActionCreators({
        syncParamsWithQuery: (query) => HotelSearchActions.syncParamsWithQuery(query),

        getLocations: () => HotelActions.getHotelLocations(),

        buildQuery: (selectedCountry, selectedCity, hotelName, page = 1) => (
            HotelSearchActions.buildQuery(
                links.ADMIN_PAGE,
                selectedCountry,
                selectedCity,
                hotelName,
                null,
                null,
                null,
                page
            )
        ),

        removeHotel: (hotelId) => HotelActions.removeHotel(hotelId),

        getHotelPage: (search) => HotelSearchActions.loadFromQuery(search)
    }, dispatch);

    return {
        ...bindedCreators,
        getDetailsLink: (id) => {
            const query = HistoryActions.getQuery();
            return ({pathname: links.ADMIN_HOTEL_ID_PAGE(id), search: query});
        },
        getEditLink: (id) => links.HOTEL_EDIT_ID_PAGE(id),

        imageLinkCreator: (imageId) => (
            links.IMAGE_DOWNLOAD_PATH(imageId)
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);