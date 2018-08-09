import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { store, history } from './store/store.js'
import Main from './containers/Main.jsx';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';

render(
   <Provider store={store}>
        <ConnectedRouter history={history}> 
            <Main/>
        </ConnectedRouter>
   </Provider>,
   document.getElementById('root')
);