import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import HotelPage from './HotelPage.jsx';
import SignUpPage from './SignUpPage.jsx';
import MainPage from './MainPage.jsx';
import LoginPage from './LoginPage.jsx';
import UserPage from './UserPage.jsx';
import { links } from '../config/links.js';

const App = (store) => {
  const authRequired = (nextState, replaceState) => {
    const state = store.getState();
    if (!state.users.loggedIn) {
      replaceState({ nextPathname: nextState.location.pathname }, links.SIGN_IN_PAGE);
    }
  };
    
  return (
      <Switch>
        <Route exact path={links.MAIN_PAGE_PATH} component={ MainPage }/>
        <Route exact path={links.HOTEL_PAGE_PATH} component={ HotelPage }/> 
        <Route exact path={links.SIGN_IN_PAGE} component={LoginPage}/>
        <Route exact path={links.SIGN_UP_PAGE} component={SignUpPage}/>
        <Route exact path={links.USER_PAGE} component={ UserPage } onEnter={authRequired}/>
      </Switch>
  );
}

export default App;