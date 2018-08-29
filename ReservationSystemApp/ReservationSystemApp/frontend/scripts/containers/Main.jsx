import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import ProtectedRoute from '../components/ProtectedRoute';
import SignUpPage from './SignUpPage';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import HotelSearchPage from './HotelSearchPage';
import UserPage from './UserPage';
import { links } from '../config/links';
import UserActions from '../actions/UserActions';
import RoomSearchPage from './RoomSearchPage';

import AdminPage from './admin/AdminPage';
import HotelEditPage from './admin/HotelEditPage';
import RoomListPage from './admin/RoomListPage';
import RoomEditPage from './admin/RoomEditPage';
import NewHotelPage from './admin/NewHotelPage';
import NewRoomPage from './admin/NewRoomPage';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.dispatch(UserActions.getProfile());
    }

    render() {
        const { isLoading, loggedIn, isAdmin, signedUp } = this.props;
        return (
            <div>
                {isLoading ?
                <h2>Loading..</h2>
                :
                <BrowserRouter>
                    <Switch>
                        <Route exact path={ links.MAIN_PAGE_PATH } component={ MainPage }/>
                        <Route exact path={ links.HOTEL_PAGE_PATH } component={ RoomSearchPage }/>
                        <Route exact path={ links.HOTEL_SEARCH_PAGE } component={ HotelSearchPage }/>
                        <ProtectedRoute
                            exact path={ links.SIGN_IN_PAGE }
                            component={ LoginPage }
                            isPermitted={ !loggedIn }
                            redirectTo={ links.HOTEL_SEARCH_PAGE }
                        />
                        <ProtectedRoute
                            exact path={ links.SIGN_UP_PAGE }
                            component={ SignUpPage }
                            isPermitted={ !signedUp }
                            redirectTo={ links.HOTEL_SEARCH_PAGE }
                        />
                        <ProtectedRoute
                            exact path={ links.PROFILE_PAGE }
                            component={ UserPage }
                            isPermitted={ loggedIn }
                            redirectTo={ links.SIGN_IN_PAGE }
                        />
                        <ProtectedRoute
                            exact path={ links.PROFILE_PAGE }
                            component={ UserPage }
                            isPermitted={ loggedIn }
                            redirectTo={ links.SIGN_IN_PAGE }
                        />
                        <ProtectedRoute
                            exact path={ links.ADMIN_PAGE }
                            component={ AdminPage }
                            isPermitted={ isAdmin }
                            redirectTo={ links.SIGN_IN_PAGE }
                        />
                        <ProtectedRoute
                            exact path={ links.HOTEL_EDIT_PAGE }
                            component={ HotelEditPage }
                            isPermitted={ isAdmin }
                            redirectTo={ links.SIGN_IN_PAGE }
                        />
                        <ProtectedRoute
                            exact path={ links.HOTEL_CREATION_PAGE }
                            component={ NewHotelPage }
                            isPermitted={ isAdmin }
                            redirectTo={ links.SIGN_IN_PAGE }
                        />
                        <ProtectedRoute
                            exact path={ links.ADMIN_ROOM_LIST_PAGE }
                            component={ RoomListPage }
                            isPermitted={ isAdmin }
                            redirectTo={ links.SIGN_IN_PAGE }
                        />
                        <ProtectedRoute
                            exact path={ links.ROOM_EDIT_PAGE }
                            component={ RoomEditPage }
                            isPermitted={ isAdmin }
                            redirectTo={ links.SIGN_IN_PAGE }
                        />
                        <ProtectedRoute
                            exact path={ links.ROOM_CREATION_PAGE }
                            component={ NewRoomPage }
                            isPermitted={ isAdmin }
                            redirectTo={ links.SIGN_IN_PAGE }
                        />
                    </Switch>
                </BrowserRouter>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isBooking: state.isBooking,
        loggedIn: state.users.loggedIn,
        isAdmin: state.users.isAdmin,
        userInfo: state.users.info,
        error: state.users.error,
        isSent: state.users.isSent,
        isValid: state.users.isValid,
        isLoading: state.users.isLoading,
        signedUp: state.users.signedUp
    }
}

export default connect(mapStateToProps)(Main);