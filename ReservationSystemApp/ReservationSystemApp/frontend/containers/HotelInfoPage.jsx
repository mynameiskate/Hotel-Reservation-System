import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { links } from '../config/links.js';
import HotelActions from '../actions/HotelActions.js';
import HotelEditField from '../components/HotelEditField.jsx';
import HotelInfo from '../components/HotelInfo.jsx';

class HotelInfoPage extends React.Component {
    constructor(props) {
        super(props);
    }

    getHotelId() {
        return this.props.match.params.id;
    }

    componentWillMount() {
       this.props.showHotel(this.getHotelId());
    }

    render() {
        const { loaded, error, editing } = this.props;
        const hotelId = this.getHotelId();

        return (
            <div>
                {loaded &&
                    <div>
                        {
                            !editing
                            ? <div>
                                <HotelInfo hotel={loaded}/>
                                <button onClick={() => this.props.showEditField(loaded.id, loaded )}>
                                    Edit
                                </button>
                                <Link to={links.ROOM_ID_PAGE(hotelId)}>
                                    See available rooms
                                </Link>
                            </div>
                            :   <HotelEditField
                                    hotel={loaded}
                                    sendRequest={(values) =>
                                        this.props.sendEditRequest(loaded.hotelId, values)
                                    }
                                    onCancelClick={this.props.hideEditField}
                                />
                        }
                        {error && <p>{error}</p>}
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        info: state.hotels.info,
        error: state.hotels.error,
        isLoading: state.hotels.isLoading,
        editing: state.hotels.editing,
        loaded: state.hotels.loaded,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showHotel: (id) => {
            dispatch(HotelActions.showHotel(id));
        },

        showEditField: (id, info) => {
            dispatch(HotelActions.startEditing(id, info));
        },

        hideEditField: (id, info) => {
            dispatch(HotelActions.stopEditing(id, info));
        },

        sendEditRequest: (id, info) => {
            dispatch(HotelActions.editHotel(id, info));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HotelInfoPage);