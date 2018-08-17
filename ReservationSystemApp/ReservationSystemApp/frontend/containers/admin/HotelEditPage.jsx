import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HotelSearchActions from '../../actions/HotelSearchActions';
import HotelActions from '../../actions/HotelActions';
import HotelEditField from '../../components/HotelEditField';

class HotelEditPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.init(this.getHotelId());
        this.props.getLocations();
    }

    getHotelId() {
        return this.props.match.params.id;
    }

    render() {
        const { loaded, error, isLoading, locations, selectedCity,
            selectedCountry } = this.props;

        return (
            <div>
                { isLoading && <h2>Loading..</h2>}
                {loaded &&
                    <div>
                        <HotelEditField
                            hotel={loaded}
                            locations={locations}
                            selectedCity={selectedCity}
                            selectedCountry={selectedCountry}
                            onCitySelect={(city) => this.props.setCurrentCity(city.value)}
                            onCountrySelect={(country) => this.props.setCurrentCountry(country.value)}
                            onNameChange={this.props.onNameChange}
                            sendRequest={(values) =>
                                this.props.sendEditRequest(loaded.hotelId, values)
                            }
                        />
                        {error && <h3>{error}</h3>}
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.users.info,
        info: state.hotels.info,
        error: state.hotels.error,
        isLoading: state.hotels.isLoading,
        editing: state.hotels.editing,
        loaded: state.hotels.loaded,
        isLoading: state.hotels.isLoading,
        locations: state.hotels.locations,
        selectedCountry: state.search.selectedCountry,
        selectedCity: state.search.selectedCity,
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        init: (id) => HotelActions.showHotel(id),

        getLocations: () => HotelActions.getLocations(),

        sendEditRequest: (id, info) => HotelActions.editHotel(id, info),

        setCurrentCountry: (country) => HotelSearchActions.setCurrentCountry(country),

        setCurrentCity: (city) => HotelSearchActions.setCurrentCity(city),

        getLocations: () => HotelActions.getLocations(),

        onNameChange: (name) => {
            return (dispatch) => {
                dispatch(HotelSearchActions.setCurrentHotelName(params.name));
                dispatch(change('searchFilterForm', 'name', params.name || ''));
            }
        }
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HotelEditPage);
