
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import rootSaga from './sagas';

// create the saga middleware
export default function configureStore(initialState, history) {
  const sagaMiddleware = createSagaMiddleware();
  const routerMW = routerMiddleware(history);

  // Concat middlewares
  const middleWares = [
    routerMW,
    sagaMiddleware,
  ];

  const enhancers = [
    applyMiddleware(...middleWares),
  ];
  // mount it on the Store
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(...enhancers
    ));

  // then run the saga
  sagaMiddleware.run(rootSaga);

  return store;
}
