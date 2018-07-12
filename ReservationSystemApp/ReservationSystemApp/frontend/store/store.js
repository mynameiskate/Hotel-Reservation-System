import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers/rootReducer.js';
import thunkMiddleware from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(  //middleware for async functions
            thunkMiddleware
        ))
);
