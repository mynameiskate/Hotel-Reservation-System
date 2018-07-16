import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HotelPage from './HotelPage.jsx'
import MainPage from './MainPage.jsx'

const App = () => (
    <Switch>
      <Route exact path='/' component={ MainPage }/>
      <Route exact path="/hotels/:id" component={ HotelPage }/> 
    </Switch>
)

export default App

