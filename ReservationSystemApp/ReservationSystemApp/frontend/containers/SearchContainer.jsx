import React from 'react';
import { connect } from 'react-redux'; 
import  HotelActions from '../actions/HotelActions.js';
import  SearchFilter  from '../components/SearchFilter.jsx';
import  HotelPageBar  from '../components/HotelPageBar.jsx';
import SearchPage from './SearchPage.jsx';

class SearchContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.resetFilter();
    }

    resetFilter = () => {
        this.props.dispatch(HotelActions.resetFilter());
        this.props.dispatch(HotelActions.getLocations());
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

    render() {
        const { selectedCountry, selectedCity, locations, goToPage,
                page, resultCount, nextPage, sendSearchRequest } = this.props;

        const countryId = selectedCountry ? selectedCountry.id : '';
        return(
            <div>
                <SearchFilter sendRequest={ (values) => sendSearchRequest( 1,  {...values, 
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
                                                                                
                <SearchPage/>   
                { (resultCount > 0) &&
                    <HotelPageBar  currentPage={page} 
                                   nextPage={nextPage}
                                   goToPage={goToPage}/>
                }
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        info: state.hotels.info,
        error: state.hotels.error,
        isSent: state.hotels.isSent,
        loaded: state.hotels.loaded,
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

export default connect(mapStateToProps)(SearchContainer); 