import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import HotelActions from '../actions/HotelActions';
import { links } from '../config/links.js';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { info, error, isLoading, removing } = this.props;
        return (
            <div className='mainPage'>
                 <h1>Welcome to hotel reservation system</h1>
                 <Link to={ links.SIGN_IN_PAGE } >
                        Log in
                 </Link>
                 <Link to={ links.SIGN_UP_PAGE } >
                        Sign up
                 </Link>
                 <Link to={ links.PROFILE_PAGE } >
                        My profile
                 </Link>
                 <Link to={ links.HOTEL_ID_SEARCH_PAGE(1) } >
                        Hotels
                 </Link>
                 { error  && <h3>Loading error</h3>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        info: state.hotels.info,
        error: state.hotels.error,
        isLoading: state.hotels.isLoading,
        removing: state.hotels.removing,
        selected: state.hotels.selected
    }
}

export default connect(mapStateToProps)(Main);