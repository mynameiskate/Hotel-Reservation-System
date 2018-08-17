import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { change } from 'redux-form';

import HotelSearchActions from '../../actions/HotelSearchActions';
import HotelActions from '../../actions/HotelActions';
import HotelEditForm from '../../components/HotelEditForm';

class HotelEditPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.init(this.getHotelId());
        this.props.getLocations(this.props);
    }

    getHotelId() {
        return this.props.match.params.id;
    }

    render() {
        const { hotelInfo, error, isLoading, locations, selectedCity,
            selectedCountry, stars, hotelName, address} = this.props;

        return (
            <div>
                { isLoading && <h2>Loading..</h2>}
                {hotelInfo &&
                    <div>
                        <HotelEditForm
                            stars={stars}
                            hotelName={hotelName}
                            address={address}
                            locations={locations}
                            selectedCity={selectedCity}
                            selectedCountry={selectedCountry}
                            onCitySelect={(city) => this.props.setCurrentCity(city.value)}
                            onCountrySelect={(country) => this.props.setCurrentCountry(country.value)}
                            onNameChange={this.props.setHotelName}
                            onAddressChange={this.props.setCurrentAddress}
                            onStarsChange={this.props.setStars}
                            sendRequest={(values) =>
                                this.props.sendEditRequest(hotelInfo.hotelId, values)
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
        hotelName: state.search.hotelName,
        userInfo: state.users.info,
        info: state.hotels.info,
        error: state.hotels.error,
        isLoading: state.hotels.isLoading,
        editing: state.hotels.editing,
        hotelInfo: state.hotels.loaded,
        isLoading: state.hotels.isLoading,
        locations: state.hotels.locations,
        selectedCountry: state.search.selectedCountry,
        selectedCity: state.search.selectedCity,
        stars: state.search.stars,
        address: state.search.address
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        init: (id) => HotelActions.showHotel(id),

        getLocations: () => HotelActions.getLocations(),

        sendEditRequest: (id, info) => HotelActions.editHotel(id, info),

        setCurrentCountry: (country) => HotelSearchActions.setCurrentCountry(country),

        setCurrentCity: (city) => HotelSearchActions.setCurrentCity(city),

        setStars: (stars) => HotelSearchActions.setStars(stars),

        getLocations: () => HotelActions.getLocations(),

        setHotelName: (name) => {
            return (dispatch) => {
                dispatch(HotelSearchActions.setCurrentHotelName(name));
                dispatch(change('hotelEditForm', 'name', name || ''));
            }
        },
        setCurrentAddress: (address) => {
            return (dispatch) => {
                dispatch(HotelSearchActions.setAddress(address));
                dispatch(change('hotelEditForm', 'address', address || ''));
            }
        }
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HotelEditPage);
