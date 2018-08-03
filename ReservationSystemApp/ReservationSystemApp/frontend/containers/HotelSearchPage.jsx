import React from 'react';
import { connect } from 'react-redux';
import  HotelActions from '../actions/HotelActions.js';
import  HotelSearchActions from '../actions/HotelSearchActions.js';
import QueryService from '../services/QueryService.js';
import  SearchFilter  from '../components/SearchFilter.jsx';
import  HotelPageBar  from '../components/HotelPageBar.jsx';
import SearchDisplay from '../components/SearchDisplay.jsx';

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

    setCountry = (id, name) => {
        this.props.dispatch(HotelActions.setCurrentCountry(id, name));
    }

    setCity = (city) => {
        this.props.dispatch(HotelActions.setCurrentCity(city));
    }

    setFilters = (filters) => {
        this.props.dispatch(HotelActions.setFilters(filters));
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            this.getHotelPage();
        } 
    }

    componentDidMount() {
        this.props.dispatch(HotelActions.getLocations());
        this.getHotelPage();
    }

    render() {
        const { selectedCountry, selectedCity, locations, 
                page, pageCount, nextPage } = this.props;
        const countryId = selectedCountry ? selectedCountry.id : '';

        return(
            <div>
                <SearchFilter sendRequest={ (values) => this.sendSearchRequest( 1,  {...values, 
                                                                                city: selectedCity, 
                                                                                countryId }) }
                              setFilter= { (values) => this.setFilters( {...values, 
                                                                city: selectedCity, 
                                                                countryId })}
                              onCancel = {this.resetFilter}                                                 
                              locations={locations}
                              selectedCountry={selectedCountry}
                              selectedCity={selectedCity}
                              onCountrySelect={this.setCountry}
                              onCitySelect={this.setCity}
                />                             
                                                                                
                <SearchDisplay/>   
               { (pageCount > 0) &&
                    <HotelPageBar  currentPage={page} 
                                   nextPage={nextPage}
                                   goToPage={this.goToPage}/>
                }            
            </div>
	    );
    } 
}

const mapStateToProps = (state) => {
    return {
        filters: state.hotels.filters,
        info: state.search.info,
        error: state.search.error,
        isLoading: state.search.isLoading,
        locations: state.hotels.locations,
        selectedCountry: state.hotels.selectedCountry,
        selectedCity: state.hotels.selectedCity,
        resultCount: state.search.resultCount,
        pageSize: state.search.pageSize,
        nextPage: state.search.nextPage,
        pageCount: state.search.pageCount,
        page: state.search.page
    }
}

export default connect(mapStateToProps)(HotelSearchPage); 