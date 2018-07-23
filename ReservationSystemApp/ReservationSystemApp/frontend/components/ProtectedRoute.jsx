import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { links } from '../config/links.js';
import { connect } from 'react-redux'; 

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => 
     (
      state.users.loggedIn === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: links.SIGN_IN_PAGE,
          state: { from: props.location }
        }} /> 
  ) } />
)

export default ProtectedRoute;
