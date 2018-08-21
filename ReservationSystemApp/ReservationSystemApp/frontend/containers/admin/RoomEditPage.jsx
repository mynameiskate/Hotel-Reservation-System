import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { links } from '../../config/links';
import  PageBar from '../../components/PageBar';
import RoomEditList from '../../components/RoomEditList';
import RoomActions from '../../actions/RoomActions';
import HotelActions from '../../actions/HotelActions';
import HistoryActions from '../../actions/HistoryActions';
import ReservationActions from '../../actions/ReservationActions';;
import RoomEditForm from '../../components/HotelRoomEditForm';
import SelectService from '../../services/SelectService';

class RoomEditPage extends React.Component {
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
        const { error, pageCount, cost, adults, nextPage, page,
            currentRoom, isLoading, isAvailable, hotelInfo } = this.props;
        const hotelName = hotelInfo ? hotelInfo.name : null;

        return (
            <div>
            {
                currentRoom &&
                    <RoomEditForm
                        roomNumber={currentRoom.number}
                        roomId={currentRoom.id}
                        cost={cost}
                        adultsAmount={adults}
                        changeAvailability={this.props.changeAvailability}
                        updateAdultsAmount={this.props.setAdultsAmount}
                        updateCost={this.props.setCost}
                        changeAvailability={this.props.setRoomAvailability}
                        adultOptions={this.props.getAdultOptions()}
                        sendRequest={this.props.editRoom}
                    />
            }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        hotelInfo: state.hotels.loaded,
        currentRoom: state.rooms.currentRoom,
        cost: state.rooms.cost,
        adults: state.rooms.adults,
        error: state.rooms.error,
        isLoading: state.rooms.isLoading,
        search: state.router.location.search,
        isAvailable: state.rooms.isRoomAvailable
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const bindedCreators = bindActionCreators({
        init: () => {
            const hotelId = ownProps.match.params.hotelId;
            const roomId = ownProps.match.params.roomId;
            return dispatch => {
                dispatch(HotelActions.showHotel(hotelId));
                dispatch(RoomActions.getHotelRoom(hotelId, roomId));
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

        editRoom: () => {}
    }, dispatch);

    return {
        ...bindedCreators,

        getEditLink: (roomId) => (
            links.ROOM_ID_EDIT_PAGE(ownProps.match.params.hotelId, roomId)
        ),

        getAdultOptions: () => SelectService.getNumericOptions(10)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomEditPage);