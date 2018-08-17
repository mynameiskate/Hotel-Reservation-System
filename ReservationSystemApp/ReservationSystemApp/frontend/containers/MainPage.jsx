import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import UserActions from '../actions/UserActions';
import { links } from '../config/links';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
       // this.props.dispatch(UserActions.getProfile());
    }

    render() {
        const { error, isAdmin } = this.props;
        return (
            <div className={'header'}>
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
                 { isAdmin &&
                    <Link to={ links.ADMIN_PAGE } >
                            Admin page
                    </Link>
                 }
                 { error  && <h3>Loading error</h3>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAdmin: state.users.isAdmin,
        info: state.hotels.info,
        error: state.hotels.error,
        isLoading: state.hotels.isLoading,
        removing: state.hotels.removing,
        selected: state.hotels.selected
    }
}

export default connect(mapStateToProps)(Main);