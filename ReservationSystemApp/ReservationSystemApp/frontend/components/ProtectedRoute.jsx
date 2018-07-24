import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { links } from '../config/links.js';
import { connect } from 'react-redux'; 


const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => 
      (console.log(props.loggedIn) || 1) ? 
      ( <Component {...props} {...rest} />) 
      : ( <Redirect
            to={{
              pathname:  links.SIGN_IN_PAGE,
              state: { from: props.location }
            }}
          />
      )
    } 
  />
);

export default ProtectedRoute;
