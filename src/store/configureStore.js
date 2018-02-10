/* import {createStore, applyMiddleware, compose} from 'redux';
import rootReducers from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';


const logger  = (store) => (next) => (action) => {
    if(typeof action !== "function") {
        console.log("dispatching ... ", action);
    }
    return next(action)
};

export default function configureStore(initialState) {
    return createStore(
        rootReducers,
        initialState,
        compose(applyMiddleware(logger, thunk, reduxImmutableStateInvariant()))
    );
}

*/

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from '../reducers'
import mySaga from '../services/sagas';

// create the saga middleware
export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
    const store = createStore(
        reducer,
        applyMiddleware(sagaMiddleware)
    )

// then run the saga
    sagaMiddleware.run(mySaga);

    return store;
}