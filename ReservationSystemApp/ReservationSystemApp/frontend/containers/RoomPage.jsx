import React from 'react';
import { connect } from 'react-redux'; 

import RoomSearchActions from '../actions/RoomSearchActions.js';
import RoomList from '../components/RoomList.jsx';

class RoomPage extends React.Component {
    constructor(props) {
        super(props);
    }

    getHotelId() {
        return this.props.match.params.id;
    }

    componentDidMount() {
        const hotelId = this.props.hotelId || this.getHotelId();
        this.props.dispatch(RoomSearchActions.loadFromQuery(hotelId));
    }

    render() {
    	const { error, isLoading, info, pageCount, nextPage } = this.props;
    	return ( 
	        <div>
                {!isLoading &&
                    <div>
                        <h3> Available rooms </h3>
                        {
                            <RoomList info={info} />
                        }
                        {error && <p>error</p>}
                        
                    </div>
                }
                { (pageCount > 0) &&
                    <HotelPageBar  currentPage={page} 
                                   nextPage={nextPage}
                                   goToPage={(num) => this.setPage(num)}/>
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