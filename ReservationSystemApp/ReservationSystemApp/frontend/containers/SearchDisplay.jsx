import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { links } from '../config/links';
import HotelActions from '../actions/HotelActions';
import HistoryActions from '../actions/HistoryActions';
import HotelList from '../components/HotelList';

class SearchDisplay extends React.Component {
    constructor(props) {
        super(props);
    }

    getDetailsLink = (id) => {
        const { moveInDate, moveOutDate, adults } = this.props;
        return this.props.getDetailsLink(id, moveInDate, moveOutDate, adults);
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
                                    getDetailsLink={this.getDetailsLink}
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
        resultCount: state.search.resultCount,
        moveInDate: state.search.moveInDate,
        moveOutDate: state.search.moveOutDate,
        adults: state.rooms.adults
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendRemoveRequest: bindActionCreators((id) => HotelActions.removeHotel(id), dispatch),

        sendEditRequest: bindActionCreators((id, info) => HotelActions.editHotel(id, info), dispatch),

        hideHotel: bindActionCreators((info) => HotelActions.hideHotel(info), dispatch),

        getDetailsLink: (id, moveInDate, moveOutDate, adults) => {
            const query = HistoryActions.getQuery(moveInDate, moveOutDate, adults);
            return (`${links.HOTEL_ID_PAGE(id)}?${query}`);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchDisplay);