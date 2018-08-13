import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RoomPage from './RoomPage.jsx';
import HotelActions from '../actions/HotelActions';
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
        const { loaded, error, editing, userInfo, isLoading } = this.props;
        const hotelId = this.getHotelId();

        return (
            <div>
                { isLoading && <h2>Loading..</h2>}
                {loaded &&
                    <div>
                        {
                            (!editing)
                            ? <div>
                                <HotelInfo hotel={loaded}/>
                                {userInfo && userInfo.isAdmin &&
                                <button onClick={() => this.props.showEditField(loaded.id, loaded )}>
                                    Edit
                                </button> }
                                <RoomPage hotelId={hotelId} />
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
        userInfo: state.users.info,
        info: state.hotels.info,
        error: state.hotels.error,
        isLoading: state.hotels.isLoading,
        editing: state.hotels.editing,
        loaded: state.hotels.loaded,
        isLoading: state.hotels.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        showHotel: (id) => HotelActions.showHotel(id),

        showEditField: (id, info) => HotelActions.startEditing(id, info),

        hideEditField: (id, info) =>  HotelActions.stopEditing(id, info),

        sendEditRequest: (id, info) => HotelActions.editHotel(id, info),
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HotelInfoPage);