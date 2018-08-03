import React from 'react';
import { connect } from 'react-redux'; 
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import HotelInfoPage from './HotelInfoPage.jsx';
import SignUpPage from './SignUpPage.jsx';
import MainPage from './MainPage.jsx';
import LoginPage from './LoginPage.jsx';
import HotelSearchPage from './HotelSearchPage.jsx';
import UserPage from './UserPage.jsx';
import { links } from '../config/links.js';
import UserActions from '../actions/UserActions.js';
import { RouterToUrlQuery } from 'react-url-query';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.dispatch(UserActions.getProfile());
    }

    render() {
        const { isLoading } = this.props;
        return (
            <div>
                {isLoading ?
                <h2>Loading..</h2>
                :
                <BrowserRouter>
                    <RouterToUrlQuery>        
                        <Switch>
                            <Route exact path={links.MAIN_PAGE_PATH} component={ MainPage }/>
                            <Route exact path={links.HOTEL_PAGE_PATH} component={ HotelInfoPage }/> 
                            <Route exact path={links.SIGN_IN_PAGE} component={LoginPage}/>
                            <Route exact path={links.SIGN_UP_PAGE} component={SignUpPage}/>
                            <Route path={links.HOTEL_SEARCH_PAGE_PATH} component={ HotelSearchPage }/>
                            <ProtectedRoute exact path={links.PROFILE_PAGE} component={ UserPage } />
                        </Switch>
                    </RouterToUrlQuery>
                </BrowserRouter>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.users.loggedIn,
        userInfo: state.users.info,
        error: state.users.error,
        isSent: state.users.isSent,
        isValid: state.users.isValid,
        isLoading: state.users.isLoading
    }
}

export default connect(mapStateToProps)(Main);