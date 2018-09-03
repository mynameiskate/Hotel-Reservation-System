import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Router } from 'react-router-dom';
import Spinner from 'react-spinkit';
import ReduxToastr from 'react-redux-toastr';
import { bindActionCreators } from 'redux';

import {
    history
} from '../store/store';

import ProtectedRoute from '../components/ProtectedRoute';
import SignUpPage from './SignUpPage';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import HotelSearchPage from './HotelSearchPage';
import UserPage from './UserPage';
import { links } from '../config/links';
import UserActions from '../actions/UserActions';
import RoomSearchPage from './RoomSearchPage';

import Layout from '../components/Layout';
import AboutPage from './AboutPage';
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

    componentDidMount() {
        this.props.getProfile();
    }

    render() {
        const { isLoading, loggedIn, isAdmin } = this.props;
        return (
            <Layout
                loggedIn={loggedIn}
                isAdmin={isAdmin}
                onSignOut={this.props.signOut}
            >
                <ReduxToastr
                    timeOut={4000}
                    newestOnTop={false}
                    preventDuplicates
                    position="top-center"
                    transitionIn="fadeIn"
                    transitionOut="fadeOut"
                    progressBar
                    closeOnToastrClick
                />
                {isLoading ?
                <div className="loadingBlock">
                    <Spinner name="ball-scale-multiple" className="loader"/>
                </div>
                :
                <Router history={history}>
                    <Switch>
                        <Route exact path={ links.MAIN_PAGE_PATH } component={ MainPage }/>
                        <Route exact path={ links.HOTEL_PAGE_PATH } component={ RoomSearchPage }/>
                        <Route exact path={ links.HOTEL_SEARCH_PAGE } component={ HotelSearchPage }/>
                        <Route exact path={ links.SIGN_IN_PAGE  } component={ LoginPage }/>
                        <Route exact path={ links.SIGN_UP_PAGE } component={ SignUpPage }/>
                        <Route exact path={ links.ABOUT_INFO_PAGE } component={ AboutPage }/>
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
                </Router>
                }
            </Layout>
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

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        signOut: () => UserActions.signOut(),
        getProfile: () => UserActions.getProfile()
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);