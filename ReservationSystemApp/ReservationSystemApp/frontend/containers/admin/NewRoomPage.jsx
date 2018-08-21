import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { change } from 'redux-form';

import RoomActions from '../../actions/RoomActions';
import HotelActions from '../../actions/HotelActions';
import RoomEditForm from '../../components/HotelRoomEditForm';
import SelectService from '../../services/SelectService';

class NewRoomPage extends React.Component {
    constructor(props) {
        super(props);
    }

    getHotelId() {
        return this.props.match.params.hotelId;
    }

    componentDidMount() {
       this.props.init(this.getHotelId());
    }

    componentDidUpdate(prevProps) {
        if (this.props.search !== prevProps.search) {
            this.props.getRoomPage(this.props.search);
        }
    }

    render() {
        const { cost, adults, isRoomAvailable, roomNumber, isNumberValid } = this.props;

        return (
            <div>
                <RoomEditForm
                    roomNumber={roomNumber}
                    cost={cost}
                    adultsAmount={adults}
                    isRoomAvailable={isRoomAvailable}
                    changeAvailability={this.props.changeAvailability}
                    updateAdultsAmount={this.props.setAdultsAmount}
                    updateNumber={this.props.setRoomNumber}
                    updateCost={this.props.setCost}
                    changeAvailability={this.props.setRoomAvailability}
                    adultOptions={this.props.getAdultOptions()}
                    sendRequest={this.props.createRoom}
                    isNumberValid={isNumberValid}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        hotelInfo: state.hotels.loaded,
        cost: state.rooms.cost,
        adults: state.rooms.adults,
        error: state.rooms.error,
        isLoading: state.rooms.isLoading,
        search: state.router.location.search,
        isRoomAvailable: state.rooms.isRoomAvailable,
        roomNumber: state.rooms.roomNumber,
        isNumberValid: state.rooms.isNumberValid,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const hotelId = ownProps.match.params.hotelId;

    const bindedCreators = bindActionCreators({
        init: () => {
            return dispatch => {
                dispatch(HotelActions.showHotel(hotelId));
            }
        },

        setCost: (cost) => {
            return dispatch => {
                dispatch(RoomActions.setCost(cost));
                dispatch(change('roomEditForm', 'cost', cost || ''));
            }
        },

        setAdultsAmount: (adults) => {
            const { value } = adults;
            return dispatch => {
                dispatch(RoomActions.setAdults(value));
            }
        },

        setRoomAvailability: () => RoomActions.setRoomAvailability(),

        createRoom: () => RoomActions.createRoom(hotelId),

        setRoomNumber: (number) => RoomActions.setRoomNumber(hotelId, number)
    }, dispatch);

    return {
        ...bindedCreators,

        getAdultOptions: () => SelectService.getNumericOptions(10)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewRoomPage);