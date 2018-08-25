import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { links } from '../../config/links';
import  PageBar from '../../components/PageBar';
import RoomEditList from '../../components/RoomEditList';
import RoomActions from '../../actions/RoomActions';
import HotelActions from '../../actions/HotelActions';
import HistoryActions from '../../actions/HistoryActions';
import ReservationActions from '../../actions/ReservationActions';
import FileActions from '../../actions/FileActions';

class RoomListPage extends React.Component {
    constructor(props) {
        super(props);
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

    getHotelId() {
        return this.props.match.params.id;
    }

    render() {
        const { error, roomInfo, pageCount, nextPage, page,
               isLoading, hotelInfo, currentRoom, } = this.props;
        const hotelName = hotelInfo ? hotelInfo.name : null;

        return (
            <div>
                <Link to={this.props.getCreationLink()}>Add new room</Link>
                { isLoading
                    ? <h3>Loading rooms...</h3>
                    : ( pageCount
                        ? <div>
                            { <h3>Rooms in {hotelName || 'hotel'}</h3>}
                            {   roomInfo &&
                                <RoomEditList
                                    info={roomInfo}
                                    getEditLink={this.props.getEditLink}
                                    imageLinkCreator={this.props.imageLinkCreator}
                                />
                            }
                            {error && <h4>An error occured during load.</h4>}
                            {!isLoading &&
                                <PageBar
                                    currentPage={page}
                                    nextPage={nextPage}
                                    goToPage={(num) => this.props.buildQuery(num)}
                                />
                            }
                        </div>
                        : <div>
                            <h3>No rooms found.</h3>
                        </div>
                    )
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
        roomInfo: state.rooms.info,
        error: state.rooms.error,
        isLoading: state.rooms.isLoading,
        page: state.rooms.page,
        nextPage: state.rooms.nextPage,
        pageCount: state.rooms.pageCount,
        search: state.router.location.search,
        isAvailable: state.rooms.isRoomAvailable,
        isFileTypeValid: state.files.isFileTypeValid,
        files: state.files.files,
        currentRoom: state.reservations.currentRoom
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const bindedCreators = bindActionCreators({
        init: (id) => HotelActions.showHotel(id),

        getRoomPage: (search) => RoomActions.loadFromQuery(ownProps.match.params.id, search),

        pushUrl: (link, query) => HistoryActions.pushUrl(link, query),

        buildQuery: (page = 1) => (
            RoomActions.buildQuery(
                links.ADMIN_HOTEL_ID_PAGE(ownProps.match.params.id),
                null, null, null, page)
        )
    }, dispatch);

    return {
        ...bindedCreators,

        imageLinkCreator: (imageId) => (
            links.IMAGE_DOWNLOAD_PATH(imageId)
        ),

        getEditLink: (roomId) => (
            links.ROOM_ID_EDIT_PAGE(ownProps.match.params.id, roomId)
        ),

        getCreationLink: () => (
            links.ROOM_ID_CREATION_PAGE(ownProps.match.params.id)
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomListPage);