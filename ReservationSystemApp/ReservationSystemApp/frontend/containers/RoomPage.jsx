import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import BookingModal from '../components/BookingModal.jsx';
import RoomFilter from '../components/RoomFilter.jsx';
import { links } from '../config/links.js';
import  PageBar  from '../components/PageBar.jsx';
import RoomActions from '../actions/RoomActions.js';
import HistoryActions from '../actions/HistoryActions.js';
import ReservationActions from '../actions/ReservationActions.js';
import RoomList from '../components/RoomList.jsx';

class RoomPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isBooking: false,
            currentRoom: {},
            hotelId: this.props.getHotelId()
        };
    }

    componentDidMount() {
        const { moveInDate, moveOutDate, adults } = this.props;
        this.props.buildQuery(moveInDate, moveOutDate, adults);
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

    setPage = (page) => {
        const { adults, moveInDate, moveOutDate } = this.props;
        this.props.buildQuery(moveInDate, moveOutDate, adults, page);
    }

    setAdults = (adults) => {
        const { moveInDate, moveOutDate } = this.props;
        this.props.buildQuery(moveInDate, moveOutDate, adults);
    }

    openModal = (room) => {
        this.setState({isBooking: true, currentRoom: room});
    }

    closeModal = () => {
        this.setState({isBooking: false, currentRoom: {}});
    }

    render() {
        const { error, isLoading, info, pageCount,
            nextPage, page, adults, cost } = this.props;
        return (
            <div>
                <RoomFilter selectedCost={cost}
                            adultsAmount={adults}
                            onCostChange={this.setCost}
                            onAdultsChange={this.setAdults}
                            onCancel={this.resetFilters}
                />
                { isLoading ?
                        <h2>Loading rooms...</h2>
                  : ( pageCount ?
                        <div>
                            <h3> Available rooms </h3>
                            {
                                <RoomList info={info}
                                          showBookModal={this.openModal}
                                          bookingLink={links.BOOKING_ID_PAGE}
                                />
                            }
                            {error && <p>error</p>}

                            <PageBar currentPage={page}
                                nextPage={nextPage}
                                goToPage={(num) => this.setPage(num)}/>
                        </div>
                      :
                        <div>
                            <h3>No available rooms with given parameters found.</h3>
                            <button onClick={this.props.resetFilters}>Back</button>
                        </div>
                    )
                }
                <BookingModal moveInDate={this.props.moveInDate}
                              moveOutDate={this.props.moveOutDate}
                              userInfo={this.state.userInfo}
                              isBooking={this.state.isBooking}
                              onClose={this.closeModal}
                              onBook={this.props.bookRoom}
                              room={this.state.currentRoom}
                 />
                 <Link to={links.BOOKING_ID_PAGE(1)}>test link </Link>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
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
    return {
        syncParamsWithQuery: (query) => {
            dispatch(RoomActions.syncParamsWithQuery(query));
        },

        getRoomPage: (search) => {
            dispatch(RoomActions.loadFromQuery(ownProps.hotelId,
                search));
        },

        pushUrl: (link, query) => {
            dispatch(HistoryActions.pushUrl(link, query));
        },

        buildQuery: (moveInDate, moveOutDate, adults, page) => {
            dispatch(RoomActions.buildQuery(
                links.ROOM_ID_PAGE(ownProps.hotelId),
                moveInDate, moveOutDate, adults, page));
        },

        bookRoom: (roomId) => {
            dispatch(ReservationActions.book(roomId));
        },

        resetFilters: () => {
            dispatch(RoomActions.buildQuery());
        },

        getHotelId: () => {
            return ownProps.hotelId;
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);