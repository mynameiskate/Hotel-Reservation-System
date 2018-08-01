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
        this.props.dispatch(HotelActions.getLocations());
    }

    setCountry = (id, name) => {
        this.props.dispatch(HotelActions.setCurrentCountry(id, name));
    }

    setCity = (city) => {
        this.props.dispatch(HotelActions.setCurrentCity(city));
    }

    setCurrentPage = (page) => {
        this.props.dispatch(HotelActions.setCurrentPage(page));
    }

    render() {
        const { selectedCountry, selectedCity, locations, 
                currentPage, resultCount, nextPage, sendSearchRequest } = this.props;
        const countryId = selectedCountry ? selectedCountry.id : null;
        return(
            <div>
                <SearchFilter sendRequest={ (values) => sendSearchRequest( 1,  {...values, 
                                                                                city: selectedCity, 
                                                                                countryId }) }
                              onCancel = {() => sendSearchRequest(1)}                                                 
                              locations={locations}
                              selectedCountry={selectedCountry}
                              selectedCity={selectedCity}
                              onCountrySelect={this.setCountry}
                              onCitySelect={this.setCity}
                />                             
                                                                                
                <SearchPage/>   
                { (resultCount > 0) &&
                    <HotelPageBar  currentPage={currentPage} 
                                   nextPage={nextPage}
                                   setCurrentPage={this.setCurrentPage}/>
                }
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        currentPage: state.hotels.currentPage,
        info: state.hotels.info,
        error: state.hotels.error,
        isSent: state.hotels.isSent,
        loaded: state.hotels.loaded,
        locations: state.hotels.locations,
        selectedCountry: state.hotels.selectedCountry,
        selectedCity: state.hotels.selectedCity,
        resultCount: state.hotels.resultCount,
        pageSize: state.hotels.pageSize,
        nextPage: state.hotels.nextPage,
        pageCount: state.hotels.pageCount
    }
}

export default connect(mapStateToProps)(SearchContainer); 