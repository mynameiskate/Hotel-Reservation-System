import React from 'react';
import { connect } from 'react-redux'; 
import  HotelActions from '../actions/HotelActions.js';
import  SearchFilter  from '../components/SearchFilter.jsx';
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

    render() {
        const { selectedCountry, selectedCity, locations, currentPage } = this.props;
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
                                                                                onCitySelect={this.setCity}/> 
                <SearchPage/>   
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
        selectedCity: state.hotels.selectedCity
    }
}

export default connect(mapStateToProps)(SearchContainer); 