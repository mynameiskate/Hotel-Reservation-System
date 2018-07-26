import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { BrowserRouter } from "react-router-dom";
import App from './containers/App.jsx';
import Main from './containers/Main.jsx';

render(
   <Provider store={store}>
        <Main/>
   </Provider>,
   document.getElementById('root')
);