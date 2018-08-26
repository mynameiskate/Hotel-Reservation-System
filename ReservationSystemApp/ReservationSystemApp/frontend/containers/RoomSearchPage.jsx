import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HotelActions from '../actions/HotelActions';
import HotelInfo from '../components/HotelInfo';

import BookingModal from '../components/BookingModal';
import { links } from '../config/links';
import  PageBar  from '../components/PageBar';
import RoomActions from '../actions/RoomActions';
import HistoryActions from '../actions/HistoryActions';
import ReservationActions from '../actions/ReservationActions';;
import RoomList from '../components/RoomList';

import { settings } from '../config/settings';

class RoomSearchPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isBookingModalOpen: false,
            hotelId: this.props.getHotelId()
        };
    }

    getHotelId() {
        return this.props.match.params.id;
    }

    componentDidMount() {
       this.props.init(this.getHotelId());
       this.props.getRoomPage(this.props.location.search);
    }

    componentDidUpdate(prevProps) {
        if (this.props.search !== prevProps.search) {
            this.props.getRoomPage(this.props.search);
        }
    }

    setPage = (page = 1) => {
        const { adults, moveInDate, moveOutDate } = this.props;
        this.props.buildQuery(moveInDate, moveOutDate, adults, page);
    }

    openModal = (room) => {
        this.props.createReservation(room);
        this.props.getServices(this.getHotelId());
        this.setState({
            isBookingModalOpen: true
        });
        this.props.setCurrentRoom(room);
    }

    onCancel = () => {
        this.props.cancelReservation();
        this.closeModal();
    }

    closeModal = () => {
        this.setState({isBookingModalOpen: false, currentRoom: {}});
        this.setPage();
    }


    render() {
        const { hotelError, roomError, loaded, roomInfo,
            pageCount, totalCost, moveInDate, moveOutDate,
            nextPage, page, services, loggedIn, currentRoom,
            moveInTime, isRoomLoading, isHotelLoading } = this.props;

        const isBookingEnabled = loggedIn && moveInDate && moveOutDate;

        return (
            <div>
                { isHotelLoading && <h3>Loading..</h3>}
                {loaded &&
                    <div>
                        <HotelInfo
                            hotel={loaded}
                            imageLink={this.props.imageLinkCreator(loaded.hotelId)}
                        />
                        {hotelError && <h3>{hotelError}</h3>}
                    </div>
                }
                { isRoomLoading
                    ? <h3>Loading rooms...</h3>
                    : ( pageCount
                        ? <div>
                            <h3> Available rooms </h3>
                            {!loggedIn && <h4>In order to book you should log in!</h4>}
                            {!moveInDate || !moveOutDate
                                && <h4>Choose move in and move out date</h4>}
                            {   roomInfo &&
                                <RoomList
                                    info={roomInfo}
                                    isBookingEnabled={isBookingEnabled}
                                    showBookModal={this.openModal}
                                    imageLinkCreator={this.props.imageLinkCreator}
                                />
                            }
                            {roomError && <h4>Rooms could not be loaded.</h4>}
                            {!isRoomLoading &&
                                <PageBar currentPage={page}
                                    nextPage={nextPage}
                                    goToPage={(num) => this.setPage(num)}
                                />
                            }
                        </div>
                        : <div>
                            <h3>No available rooms with given parameters found.</h3>
                            <button onClick={this.props.resetFilters}>Back</button>
                        </div>
                    )
                }

                <BookingModal
                    moveInDate={this.props.moveInDate}
                    moveOutDate={this.props.moveOutDate}
                    isOpen={this.state.isBookingModalOpen}
                    onClose={this.closeModal}
                    onCancel={this.onCancel}
                    onBook={this.props.confirmReservation}
                    room={currentRoom}
                    time={moveInTime}
                    onTimeChange={this.props.setMoveInTime}
                    services={services}
                    totalCost={totalCost}
                    addService={this.props.addService}
                    removeService={this.props.removeService}
                    secondsLimit={settings.confirmationLimit}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        hotelError: state.hotels.error,
        isHotelLoading: state.hotels.isLoading,
        loaded: state.hotels.loaded,

        currentRoom: state.reservations.currentRoom,
        totalCost: state.reservations.totalCost,
        loggedIn: state.users.loggedIn,
        services: state.reservations.services,
        moveInDate: state.search.moveInDate,
        moveOutDate: state.search.moveOutDate,
        userInfo: state.users.userInfo,
        adults: state.rooms.adults,
        cost: state.rooms.cost,
        roomInfo: state.rooms.info,
        roomError: state.rooms.error,
        isRoomLoading: state.rooms.isLoading,
        page: state.rooms.page,
        nextPage: state.rooms.nextPage,
        pageCount: state.rooms.pageCount,
        search: state.router.location.search
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const bindedCreators = bindActionCreators({
        init: (id) => HotelActions.showHotel(id),

        syncParamsWithQuery: (query) => RoomActions.syncParamsWithQuery(query),

        getRoomPage: (search) => RoomActions.loadFromQuery(ownProps.match.params.id, search),

        pushUrl: (link, query) => HistoryActions.pushUrl(link, query),

        buildQuery: (moveInDate, moveOutDate, adults, page) => (
            RoomActions.buildQuery(
                links.ROOM_ID_PAGE(ownProps.match.params.id),
                moveInDate, moveOutDate, adults, page)
        ),

        confirmReservation: (moveInTime) => ReservationActions.confirmReservation(moveInTime),

        cancelReservation: () => ReservationActions.cancelReservation(),

        resetFilters: () => RoomActions.buildQuery(),

        createReservation: (room, moveInTime) => ReservationActions.createReservation(room, moveInTime),

        getServices: (id) => ReservationActions.getServices(id),

        addService: (service) => ReservationActions.addService(service),

        removeService: (service) => ReservationActions.removeService(service),

        setCurrentRoom: (room) => ReservationActions.setCurrentRoom(room),

        setMoveInTime: (time) => ReservationActions.setMoveInTime(time)
    }, dispatch);

    return {
        ...bindedCreators,
        getHotelId: () => ownProps.hotelId,

        imageLinkCreator: (imageId) => (
            links.IMAGE_DOWNLOAD_PATH(imageId)
        )

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomSearchPage);