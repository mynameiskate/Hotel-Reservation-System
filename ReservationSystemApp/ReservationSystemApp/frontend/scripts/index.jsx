import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store, history } from './store/store';
import Main from './containers/Main';
import { ConnectedRouter } from 'connected-react-router';
import '../styles/main.less';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

render(
   <Provider store={store}>
        <ConnectedRouter history={history}>
            <Main/>
        </ConnectedRouter>
   </Provider>,
   document.getElementById('root')
);