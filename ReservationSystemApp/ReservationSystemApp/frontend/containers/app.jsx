import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HotelPage from './HotelPage.jsx';
import SignUpPage from './SignUpPage.jsx';
import MainPage from './MainPage.jsx';
import LoginPage from './LoginPage.jsx';
import { links } from '../config/links.js';

const App = () => (
    <Switch>
      <Route exact path={links.MAIN_PAGE_PATH} component={ MainPage }/>
      <Route exact path={links.HOTEL_PAGE_PATH} component={ HotelPage }/> 
      <Route exact path={links.SIGN_IN_PAGE} component={LoginPage}/>
      <Route exact path={links.SIGN_UP_PAGE} component={SignUpPage}/>
    </Switch>
)

export default App

