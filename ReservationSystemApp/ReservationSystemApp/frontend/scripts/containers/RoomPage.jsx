import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from 'react-spinkit';

import BookingModal from '../components/users/BookingModal';
import { links } from '../config/links';
import  PageBar  from '../components/PageBar';
import RoomActions from '../actions/RoomActions';
import HistoryActions from '../actions/HistoryActions';
import ReservationActions from '../actions/ReservationActions';;
import RoomList from '../components/rooms/RoomList';
import { settings } from '../config/settings';

class RoomPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isBookingModalOpen: false,
            hotelId: this.props.getHotelId()
        };
    }

    componentDidMount() {
        this.props.getRoomPage(this.props.search);
    }

    componentWillReceiveProps(nextProps) {
        const query = nextProps.search;
        this.props.syncParamsWithQuery(query);
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
        this.props.getServices(this.state.hotelId);
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
        const { error, isLoading, info, pageCount, totalCost,
            moveInDate, moveOutDate, nextPage, page,
            services, loggedIn, currentRoom, moveInTime } = this.props;
        const isBookingEnabled = loggedIn && moveInDate && moveOutDate;
        return (
            <div>
                { isLoading ?
                        <div className="loadingBlock">
                            <Spinner name="ball-scale-multiple" className="loader"/>
                        </div>
                  : ( pageCount ?
                        <div>
                            <h3> Available rooms </h3>
                            {!loggedIn && <h4>In order to book you should log in!</h4>}
                            {!moveInDate || !moveOutDate
                                && <h4>Choose move in and move out date</h4>}
                            {
                                <RoomList info={info}
                                          isBookingEnabled={isBookingEnabled}
                                          showBookModal={this.openModal}
                                />
                            }
                            {error && <p>error</p>}
                            {!isLoading &&
                                <PageBar currentPage={page}
                                    nextPage={nextPage}
                                    goToPage={(num) => this.setPage(num)}/>
                            }
                        </div>
                      :
                        <div>
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
        currentRoom: state.reservations.currentRoom,
        totalCost: state.reservations.totalCost,
        loggedIn: state.users.loggedIn,
        services: state.reservations.services,
        moveInDate: state.search.moveInDate,
        moveOutDate: state.search.moveOutDate,
        info: state.hotels.info,
        userInfo: state.users.userInfo,
        adults: state.rooms.adults,
        cost: state.rooms.cost,
        info: state.rooms.info,
        error: state.rooms.error,
        isLoading: state.rooms.isLoading,
        page: state.rooms.page,
        nextPage: state.rooms.nextPage,
        pageCount: state.rooms.pageCount,
        search: state.router.location.search
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const bindedCreators = bindActionCreators({
        syncParamsWithQuery: (query) => RoomActions.syncParamsWithQuery(query),

        getRoomPage: (search) => RoomActions.loadFromQuery(ownProps.hotelId, search),

        pushUrl: (link, query) => HistoryActions.pushUrl(link, query),

        buildQuery: (moveInDate, moveOutDate, adults, page) => (
            RoomActions.buildQuery(
                links.ROOM_ID_PAGE(ownProps.hotelId),
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
        getHotelId: () => ownProps.hotelId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);