import React from 'react';
import { connect } from 'react-redux';
import HotelActions from '../actions/HotelActions';
import HistoryActions from '../actions/HistoryActions';
import HotelList from '../components/HotelList.jsx';
import RoomActions from '../actions/RoomActions';
import { links } from '../config/links';

class SearchDisplay extends React.Component {
    constructor(props) {
        super(props);
    }

    getDetailsLink = (id) => {
        const { moveInDate, moveOutDate, adults } = this.props;
        return this.props.getDetailsLink(id, moveInDate, moveOutDate, adults);
    }

    onViewDetailsClick = (id) => {
        const { moveInDate, moveOutDate, adults } = this.props;
        this.props.buildDetailsQuery(id, moveInDate, moveOutDate, adults);
    }

    render() {
        const { info, error, isLoading, removing, resultCount } = this.props;
        return (
            <div className='searchPage'>
                { isLoading ?
                        <h2>Loading hotels...</h2>
                  : ( resultCount ?
                    <div>
                        <h3> Search results: {resultCount} destination(s)</h3>
                        <HotelList  info={info}
                                    removing={removing}
                                    onDeleteClick={this.props.sendRemoveRequest}
                                    onEditClick={this.props.sendEditRequest}
                                    getDetailsLink={this.props.getDetailsLink}
                        />
                    </div>
                      : error ? <h3>Loading error</h3>
                        : <h3>No results, try again?</h3>
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        info: state.search.info,
        error: state.search.error,
        isLoading: state.search.isLoading,
        removing: state.hotels.removing,
        selected: state.hotels.selected,
        resultCount: state.search.resultCount
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendRemoveRequest: (id) => {
            dispatch(HotelActions.removeHotel(id));
        },

        sendEditRequest: (id, info) => {
            dispatch(HotelActions.editHotel(id, info));
        },

        hideHotel: (info) => {
            dispatch(HotelActions.hideHotel(info));
        },

        buildDetailsQuery: (id, moveInDate, moveOutDate, adults, page) => {
            dispatch(RoomActions.buildQuery(
                links.HOTEL_ID_PAGE(id),
                moveInDate, moveOutDate, adults, page));
        },

        getDetailsLink: (id, moveInDate, moveOutDate, adults, page) => {
            const query = HistoryActions.getQuery(moveInDate, moveOutDate, adults, page);
            return (`${links.HOTEL_ID_PAGE(id)}?${query}`)
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(SearchDisplay);