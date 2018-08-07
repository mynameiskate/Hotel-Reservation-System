import React from 'react';
import { connect } from 'react-redux'; 
import { push } from 'connected-react-router';
import queryString from 'query-string';

import { links } from '../config/links.js';
import  PageBar  from '../components/PageBar.jsx';
import RoomSearchActions from '../actions/RoomSearchActions.js';
import RoomList from '../components/RoomList.jsx';

class RoomPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getRoomPage();
    }

    componentWillReceiveProps(nextProps) {
        const query = nextProps.search;
        const params = queryString.parse(query);

        if (nextProps.page && this.props.page !== params.page) {
            this.props.dispatch(RoomSearchActions.setCurrentPage(params.page));
        }
    }

    buildQuery = (page = 1) => {
        const params = {
            page
        };

        const query = queryString.stringify(params);
        this.props.dispatch(push(`${links.ROOM_ID_PAGE(this.getHotelId())}?${query}`));
    }

    componentDidUpdate(prevProps) {
        if (this.props.search !== prevProps.search) {
            this.getRoomPage();
        } 
    }
   
    getRoomPage() {
        const hotelId = this.getHotelId();
        this.props.dispatch(RoomSearchActions.loadFromQuery(hotelId, this.props.search));
    }

    getHotelId() {
        return this.props.match.params.id;
    }

    resetFilters = () => {
        this.buildQuery();
    }

    setPage = (page) => {
        this.buildQuery(page);
    }

    render() {
    	const { error, isLoading, info, pageCount, nextPage, page } = this.props;
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
                    <PageBar  currentPage={page} 
                              nextPage={nextPage}
                              goToPage={(num) => this.setPage(num)}/>
                }
	        </div>
	    );
    } 
}

const mapStateToProps = (state, ownProps) => {
    return {
        info: state.rooms.info,
        error: state.rooms.error,
        isLoading: state.rooms.isLoading,
        page: state.rooms.page,
        nextPage: state.rooms.nextPage,
        pageCount: state.rooms.nextPage,
        search: state.router.location.search
    }
}

export default connect(mapStateToProps)(RoomPage); 