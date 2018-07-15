import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HotelPage from './HotelPage.jsx'
import MainPage from './MainPage.jsx'
import HotelList from '../components/HotelList.jsx'

const App = () => (
    <Switch>
      <Route exact path='/' component={ MainPage }/>
      <Route exact path="/api/hotels/:id" component={ HotelPage }/> 
    </Switch>
)

export default App

