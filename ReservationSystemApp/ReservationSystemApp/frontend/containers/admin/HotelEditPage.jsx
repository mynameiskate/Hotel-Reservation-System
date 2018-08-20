import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { change } from 'redux-form';

import HotelSearchActions from '../../actions/HotelSearchActions';
import HotelActions from '../../actions/HotelActions';
import ReservationActions from '../../actions/ReservationActions';
import HotelEditForm from '../../components/HotelEditForm';
import ServiceCreationForm from '../../components/ServiceCreationForm';
import SelectService from '../../services/SelectService';

class HotelEditPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isServiceEditorShown: false
        }
    }

    componentDidMount() {
        const hotelId = this.getHotelId();
        this.props.init(hotelId);
        this.props.getLocations();
        this.props.getServices(hotelId);
        this.props.getPossibleServices();
    }

    getHotelId() {
        return this.props.match.params.id;
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
        const { hotelInfo, error, isLoading, locations, selectedCity,
            selectedCountry, stars, hotelName, address, services, newService,
            newServiceCost } = this.props;

        return (
            <div>
                { isLoading && <h2>Loading..</h2>}
                {hotelInfo &&
                    <div>
                        <HotelEditForm
                            stars={stars}
                            starOptions={this.props.getStarOptions()}
                            hotelName={hotelName}
                            address={address}
                            locations={locations}
                            selectedCity={selectedCity}
                            cityOptions={this.getCityOptions()}
                            selectedCountry={selectedCountry}
                            countryOptions={this.getCountryOptions()}
                            onCitySelect={(city) => this.props.setCurrentCity(city.value)}
                            onCountrySelect={(country) => this.props.setCurrentCountry(country.value)}
                            onNameChange={this.props.setHotelName}
                            onAddressChange={this.props.setCurrentAddress}
                            onStarsChange={this.props.setStars}
                            sendRequest={(values) =>
                                this.props.sendEditRequest(hotelInfo.hotelId, values)
                            }

                            isServiceEditorShown={this.state.isServiceEditorShown}
                            services={services}
                            possibleServices={this.props.possibleServices}
                            changeVisibility={this.changeServicesVisibility}
                            addService={this.props.addService}
                            removeService={this.props.removeService}
                            updateCost={this.props.updateServiceCost}
                        />
                        <ServiceCreationForm
                            newService={newService}
                            newServiceCost={newServiceCost}
                            addCost={this.props.addNewServiceCost}
                            chooseService={this.props.chooseNewService}
                            serviceOptions={this.getServiceOptions() || []}
                            createNewService={this.props.createNewService}
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
        address: state.search.address,
        services: state.reservations.services,
        possibleServices: state.reservations.possibleServices,
        newService: state.reservations.newService,
        newServiceCost: state.reservations.newServiceCost
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const hotelId = ownProps.match.params.id;
    const bindedCreators = bindActionCreators({
        init: (id) => HotelActions.showHotel(id),

        getServices: (id) => ReservationActions.getServices(id),

        getLocations: () => HotelActions.getLocations(),

        sendEditRequest: () => HotelActions.editHotel(hotelId),

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
        },

        addService: (service) => ReservationActions.addHotelService(service),

        removeService: (id) => ReservationActions.removeHotelService(id),

        updateServiceCost: (id, cost) => {
            return (dispatch) => {
                dispatch(ReservationActions.updateHotelServiceCost(id, cost));
                dispatch(change('hotelEditForm', `cost${id}`, cost || ''));
            }
        },

        addNewServiceCost: (cost) => {
            return dispatch => {
                dispatch(ReservationActions.addNewServiceCost(cost));
                dispatch(change('serviceCreationForm', 'cost', cost || ''));
            }
        },

        chooseNewService: (service) => ReservationActions.chooseNewService(service),

        getPossibleServices: () => ReservationActions.getPossibleServices(),

        createNewService: (serviceId, cost) => (
            ReservationActions.createNewService(hotelId, { serviceId, cost })
        )
    }, dispatch);

    return {
        ...bindedCreators,
        getServiceOptions: (services) => SelectService.getOptions(services, 'name', 'serviceId'),

        getCountryOptions: (locations) =>  SelectService.getOptions(locations, 'country', 'countryId'),

        getCityOptions: (locations, selectedCountry) => (
            SelectService.getFilteredOptions(locations, 'countryId', selectedCountry, 'city', 'cityId')
        ),

        getStarOptions: () => SelectService.getNumericOptions(5)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HotelEditPage);
