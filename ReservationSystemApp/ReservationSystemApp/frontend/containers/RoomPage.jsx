import React from 'react';
import { connect } from 'react-redux'; 

import RoomSearchActions from '../actions/RoomSearchActions.js';
import RoomList from '../components/RoomList.jsx';

class RoomPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { hotelId } = this.props;
        this.props.dispatch(RoomSearchActions.loadFromQuery(hotelId));
    }

    render() {
    	const { error, isLoading, info } = this.props;
    	return ( 
	        <div>
                {!isLoading &&
                    <div>
                        {
                            <RoomList info={info} />
                        }
                        {error && <p>error</p>}
                    </div>
                }
	        </div>
	    );
    } 
}

const mapStateToProps = (state, ownProps) => {
    return {
        id: ownProps.hotelId,
        info: state.rooms.info,
        error: state.rooms.error,
        isLoading: state.rooms.isLoading
    }
}

export default connect(mapStateToProps)(RoomPage); 