import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Main from './components/main.jsx'
import { store } from './store/store.js'

render(
   <Provider store={store}>
       <Main />
   </Provider>,
   document.getElementById("root")
);