import React from 'react';
import { connect } from 'react-redux'; 
import { push } from 'connected-react-router';
import queryString from 'query-string';

import RoomFilter from '../components/RoomFilter.jsx';
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

        if (this.props.adults !== params.canPlace) {
            this.props.dispatch(RoomSearchActions.setAdults(params.canPlace));
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
                { pageCount ? 
                    (!isLoading && 
                        <div>
                            <h3> Available rooms </h3>
                            {
                                <RoomList info={info} />
                            }
                            {error && <p>error</p>}

                            <PageBar  currentPage={page} 
                                nextPage={nextPage}
                                goToPage={(num) => this.setPage(num)}/>
                        </div>
                    )
                    : <h3>No available rooms with given parameters found.</h3>
                }
	        </div>
	    );
    } 
}

const mapStateToProps = (state) => {
    return {
        adults: state.rooms.adults,
        cost: state.rooms.cost,
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