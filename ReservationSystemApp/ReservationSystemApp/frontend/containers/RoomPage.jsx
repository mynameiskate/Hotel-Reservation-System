import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

import BookingModal from '../components/BookingModal.jsx';
import RoomFilter from '../components/RoomFilter.jsx';
import { links } from '../config/links.js';
import  PageBar  from '../components/PageBar.jsx';
import RoomActions from '../actions/RoomActions.js';
import RoomList from '../components/RoomList.jsx';

class RoomPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isBooking: false,
            currentRoom: {},
            hotelId: this.getHotelId()
        };
    }

    componentDidMount() {
        this.getRoomPage();
    }

    componentWillReceiveProps(nextProps) {
        const query = nextProps.search;
        const params = queryString.parse(query);

        if (nextProps.page && this.props.page !== params.page) {
            this.props.dispatch(RoomActions.setCurrentPage(params.page));
        }

        if (this.props.adults !== params.canPlace) {
            this.props.dispatch(RoomActions.setAdults(params.canPlace));
        }
    }

    buildQuery = (canPlace, page = 1) => {
        const params = {
            page
        };

        if (canPlace) {
            params.canPlace = canPlace;
        }

        const query = queryString.stringify(params);
        this.props.dispatch(push(`${links.ROOM_ID_PAGE(this.state.hotelId)}?${query}`));
    }

    componentDidUpdate(prevProps) {
        if (this.props.search !== prevProps.search) {
            this.getRoomPage();
        }
    }

    getRoomPage() {
        const hotelId = this.getHotelId();
        this.props.dispatch(RoomActions.loadFromQuery(hotelId, this.props.search));
    }

    getHotelId() {
        return this.props.match.params.id;
    }

    resetFilters = () => {
        this.buildQuery();
    }

    setPage = (page) => {
        const { stars } = this.props;
        this.buildQuery(stars, page);
    }

    setAdults = (adults) => {
        this.buildQuery(adults);
    }

    setCost = (cost) => {

    }

    resetFilters = () => {
        this.buildQuery();
    }

    openModal = (room) => {
        this.setState({isBooking: true, currentRoom: room});
    }

    closeModal = () => {
        this.setState({isBooking: false, currentRoom: {}});
    }

    bookRoom = (roomId) => {
        this.props.dispatch(RoomActions.bookRoom(roomId));
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

                            <PageBar  currentPage={page}
                                nextPage={nextPage}
                                goToPage={(num) => this.setPage(num)}/>
                        </div>

                      :
                        <div>
                            <h3>No available rooms with given parameters found.</h3>
                            <button onClick={this.resetFilters}>Back</button>
                        </div>
                    )
                }
                <BookingModal moveInDate={this.props.moveInDate}
                              moveOutDate={this.props.moveOutDate}
                              userInfo={this.state.userInfo}
                              isBooking={this.state.isBooking}
                              onClose={this.closeModal}
                              onBook={this.bookRoom}
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

export default connect(mapStateToProps)(RoomPage);