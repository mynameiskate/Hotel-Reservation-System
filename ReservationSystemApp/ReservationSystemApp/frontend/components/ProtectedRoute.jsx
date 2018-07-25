import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { links } from '../config/links.js';
import { connect } from 'react-redux'; 
import  UserActions  from '../actions/UserActions.js';

const ProtectedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
    // <Route {...rest} 
    //     /*componentWillMount={rest.dispatch(UserActions.getInfo())}*/
    //     render={(props) => (
    //                 (rest.loggedIn) ?
    //                 ( <Component {...props}/>) 
    //                 : (<Redirect
    //                         to={{
    //                                 pathname:  links.SIGN_IN_PAGE,
    //                                 state: { from: props.location }
    //                             }}
    //                 />)
    //             )
    //     }
    // />
    (rest.loggedIn) ?
                    (<Route {...rest} component={Component} />) 
                    : (<Redirect
                            to={{
                                    pathname:  links.SIGN_IN_PAGE,
                                    state: { from: rest.location }
                                }}
                    />)

);

const mapStateToProps = (state) => {
	return {
	    loggedIn: state.users.loggedIn
	}
}

export default connect(mapStateToProps)(ProtectedRoute); 
