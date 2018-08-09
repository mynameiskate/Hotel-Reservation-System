import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { links } from '../config/links.js';
import { connect } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => (
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
