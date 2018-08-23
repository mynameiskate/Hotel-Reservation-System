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

class NewHotelPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isServiceEditorShown: false
        }
    }

    componentDidMount() {
        this.props.getLocations();
        this.props.getPossibleServices();
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

    createNewService = (serviceId, name, cost) => {
        this.props.addService({ serviceId, name, cost });
        this.props.updatePossibleServices(serviceId);
        this.props.addNewServiceCost();
    }

    render() {
        const { error, isLoading, selectedCity, selectedCountry,
                stars, hotelName, address, services, newService,
                newServiceCost, newServiceName } = this.props;

        return (
            <div>
                { isLoading && <h2>Loading..</h2>}
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

                    isServiceEditorShown={this.state.isServiceEditorShown}
                    services={services}
                    changeVisibility={this.changeServicesVisibility}
                    addService={this.props.addService}
                    removeService={this.props.removeService}
                    updateCost={this.props.updateServiceCost}
                />
                <ServiceCreationForm
                    newService={newService}
                    newServiceCost={newServiceCost}
                    newServiceName={newServiceName}
                    addCost={this.props.addNewServiceCost}
                    chooseService={this.props.chooseNewService}
                    serviceOptions={this.getServiceOptions() || []}
                    createNewService={this.createNewService}
                />
                {error && <h3>{error}</h3>}
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
        newServiceCost: state.reservations.newServiceCost,
        newServiceName: state.reservations.newServiceName
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
        },

        addService: (service) => {
            return dispatch => {
                dispatch(ReservationActions.addHotelService(service));
                dispatch(change('hotelEditForm', `cost${service.serviceId}`, service.cost || ''));
            }
        },

        removeService: (id) => ReservationActions.removeHotelService(id),

        updateServiceCost: (id, cost) => {
            return (dispatch) => {
                dispatch(ReservationActions.updateHotelServiceCost(id, cost));
                dispatch(change('hotelEditForm', `cost${id}`, cost || ''));
            }
        },

        addNewServiceCost: (cost = null) => {
            return dispatch => {
                dispatch(ReservationActions.addNewServiceCost(cost));
                dispatch(change('serviceCreationForm', 'cost', cost || ''));
            }
        },

        chooseNewService: (service) => ReservationActions.chooseNewService(service),

        getPossibleServices: () => ReservationActions.getPossibleServices(),

        updatePossibleServices: (serviceId) => ReservationActions.updatePossibleServices(serviceId)
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

export default connect(mapStateToProps, mapDispatchToProps)(NewHotelPage);