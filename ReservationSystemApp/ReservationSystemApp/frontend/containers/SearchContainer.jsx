import React from 'react';
import { connect } from 'react-redux'; 
import  HotelActions from '../actions/HotelActions.js';
import  SearchFilter  from '../components/SearchFilter.jsx';

class SearchContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(HotelActions.getLocations());
    }

    setCountry = (country) => {
        this.props.dispatch(HotelActions.setCurrentCountry(country));
    }

    setCity = (city) => {
        this.props.dispatch(HotelActions.setCurrentCity(city));
    }

    sendSearchRequest = (options) => {
        this.props.dispatch(HotelActions.filterHotels(options));
    }


    render() {
        const { selectedCountry, selectedCity, locations } = this.props;
        return(
            <div>
                <SearchFilter sendRequest={ (values) => this.sendSearchRequest({...values, 
                                                                                city: selectedCity, 
                                                                                country: selectedCountry}) }
                              locations={locations}
                              selectedCountry={selectedCountry}
                              selectedCity={selectedCity}
                              onCountrySelect={this.setCountry}
                              onCitySelect={this.setCity}/> 
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
        selectedCity: state.hotels.selectedCity
    }
}

export default connect(mapStateToProps)(SearchContainer); 