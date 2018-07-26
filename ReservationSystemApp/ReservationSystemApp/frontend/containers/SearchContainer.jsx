import React from 'react';
import { connect } from 'react-redux'; 
import  UserActions  from '../actions/UserActions.js';
import  HotelActions from '../actions/HotelActions.js';
import  SearchFilter  from '../components/SearchFilter.jsx';

class SearchContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(HotelActions.getLocations());
    }

    getCountryOptions = (locations) => {
        return (locations) ?
               locations.map(location => ( 
                   { value: location.country, 
                     label: location.country}) 
                )
               : [];
    }

    render() {
        const { countryList, cities, selectedCountry, locations } = this.props;
        return(
            <div>
                <SearchFilter sendRequest={(data) => this.sendSearchRequest(data)}
                              countries={this.getCountryOptions(locations)}/> 
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
        selectedCountry: state.hotels.selectedCountry,
        locations: state.hotels.locations,
        cities: state.hotels.cities
    }
}

export default connect(mapStateToProps)(SearchContainer); 