import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HotelActions from '../../actions/HotelActions';
import HotelEditField from '../../components/HotelEditField';

class HotelEditPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.init(this.getHotelId());
    }

    getHotelId() {
        return this.props.match.params.id;
    }

    render() {
        const { loaded, error, isLoading } = this.props;

        return (
            <div>
                { isLoading && <h2>Loading..</h2>}
                {loaded &&
                    <div>
                        <HotelEditField
                            hotel={loaded}
                            sendRequest={(values) =>
                                this.props.sendEditRequest(loaded.hotelId, values)
                            }
                        />
                        {error && <h3>{error}</h3>}
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
        init: (id) => HotelActions.showHotel(id),

        sendEditRequest: (id, info) => HotelActions.editHotel(id, info),
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HotelEditPage);