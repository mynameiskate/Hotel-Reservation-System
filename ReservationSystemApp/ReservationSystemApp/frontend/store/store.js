import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers/rootReducer.js';
import thunkMiddleware from 'redux-thunk';

export const store = createStore(
    rootReducer,
    applyMiddleware(  //middleware for async functions
        thunkMiddleware
    )
);
