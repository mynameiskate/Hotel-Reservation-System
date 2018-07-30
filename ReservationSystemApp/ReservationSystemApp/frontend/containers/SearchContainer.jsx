import React from 'react';
import { connect } from 'react-redux'; 
import  HotelActions from '../actions/HotelActions.js';
import  SearchFilter  from '../components/SearchFilter.jsx';
import  NavigationBar  from '../components/NavigationBar.jsx';
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

    sendSearchRequest = (page, options) => {
        this.props.dispatch(HotelActions.getHotelPage(page, options));
    }

    setCurrentPage = (page) => {
        this.props.dispatch(HotelActions.setCurrentPage(page));
    }


    render() {
        const { selectedCountry, selectedCity, locations, currentPage, resultCount, pageSize } = this.props;
        const pageCount = pageSize ? Math.ceil(resultCount / pageSize) : 0;
        const nextPage = (currentPage < pageCount) ? (currentPage + 1) : null;
        return(
            <div>
                <SearchFilter sendRequest={ (values) => this.sendSearchRequest( currentPage,
                                                                                {...values, 
                                                                                city: selectedCity, 
                                                                                countryId: selectedCountry.id}) }
                            locations={locations}
                            selectedCountry={selectedCountry}
                            selectedCity={selectedCity}
                            onCountrySelect={this.setCountry}
                            onCitySelect={this.setCity}
                />                             
                                                                                
                <SearchPage/>   
                <NavigationBar currentPage={currentPage} 
                               nextPage={nextPage}
                               setCurrentPage={this.setCurrentPage}/>
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
        pageSize: state.hotels.pageSize
    }
}

export default connect(mapStateToProps)(SearchContainer); 