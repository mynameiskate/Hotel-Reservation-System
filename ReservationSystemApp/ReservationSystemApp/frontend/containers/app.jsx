import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HotelPage from './HotelPage.jsx'
import MainPage from './MainPage.jsx'
import { links } from '../config/links.js';

const App = () => (
    <Switch>
      <Route exact path={links.MAIN_PAGE_PATH} component={ MainPage }/>
      <Route exact path={links.HOTEL_PAGE_PATH} component={ HotelPage }/> 
    </Switch>
)

export default App

