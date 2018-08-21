import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { change } from 'redux-form';

import HotelSearchActions from '../../actions/HotelSearchActions';
import HotelActions from '../../actions/HotelActions';
import HotelEditForm from '../../components/HotelEditForm';
import SelectService from '../../services/SelectService';

class NewHotelPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isServiceEditorShown: false
        }
    }

    componentDidMount() {
        this.props.getLocations();
    }

    changeServicesVisibility = () => {
        const { isServiceEditorShown } = this.state;
        this.setState({
            isServiceEditorShown: !isServiceEditorShown
        })
    }

    getServiceOptions = () => {
        return this.props.getServiceOptions(this.props.possibleServices);
    }

    getCityOptions = () => {
        const { locations, selectedCountry } = this.props;
        return this.props.getCityOptions(locations, selectedCountry);
    }

    getCountryOptions = () => {
        return this.props.getCountryOptions(this.props.locations);
    }

    render() {
        const { error, isLoading, selectedCity, address,
                selectedCountry, stars, hotelName } = this.props;

        return (
            <div>
                { isLoading && <h2>Loading..</h2>}
                <div>
                    <HotelEditForm
                        stars={stars}
                        hotelName={hotelName}
                        address={address}

                        starOptions={this.props.getStarOptions()}
                        cityOptions={this.getCityOptions()}
                        countryOptions={this.getCountryOptions()}

                        selectedCity={selectedCity}
                        selectedCountry={selectedCountry}

                        onCitySelect={(city) => this.props.setCurrentCity(city.value)}
                        onCountrySelect={(country) => this.props.setCurrentCountry(country.value)}
                        onNameChange={this.props.setHotelName}
                        onAddressChange={this.props.setCurrentAddress}
                        onStarsChange={this.props.setStars}
                        sendRequest={this.props.sendCreateRequest}

                        isServiceEditorShown={false}
                    />
                    {error && <h3>{error}</h3>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        hotelId: state.hotels.hotelId,
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
        address: state.search.address,
    }
}

const mapDispatchToProps = (dispatch) => {
    const bindedCreators = bindActionCreators({
        getLocations: () => HotelActions.getLocations(),

        sendCreateRequest: () => HotelActions.createHotel(),

        setCurrentCountry: (country) => HotelSearchActions.setCurrentCountry(country),

        setCurrentCity: (city) => HotelSearchActions.setCurrentCity(city),

        setStars: (stars) => HotelSearchActions.setStars(stars),

        getLocations: () => HotelActions.getHotelLocations(true),

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

    return {
        ...bindedCreators,

        getCountryOptions: (locations) =>  SelectService.getOptions(locations, 'country', 'countryId'),

        getCityOptions: (locations, selectedCountry) => (
            SelectService.getFilteredOptions(locations, 'countryId', selectedCountry, 'city', 'cityId')
        ),

        getStarOptions: () => SelectService.getNumericOptions(5)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewHotelPage);
