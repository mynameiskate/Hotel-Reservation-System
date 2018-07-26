import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import HotelPage from './HotelPage.jsx';
import SignUpPage from './SignUpPage.jsx';
import MainPage from './MainPage.jsx';
import LoginPage from './LoginPage.jsx';
import UserPage from './UserPage.jsx';
import { links } from '../config/links.js';

const App = () => {
  return ( 
        <Switch>
          <Route exact path={links.MAIN_PAGE_PATH} component={ MainPage }/>
          <Route exact path={links.HOTEL_PAGE_PATH} component={ HotelPage }/> 
          <Route exact path={links.SIGN_IN_PAGE} component={LoginPage}/>
          <Route exact path={links.SIGN_UP_PAGE} component={SignUpPage}/>
          <ProtectedRoute exact path={links.PROFILE_PAGE} component={ UserPage } />
        </Switch>
  );
}

export default App;