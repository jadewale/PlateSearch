
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import rootSaga from './sagas';

// create the saga middleware
export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  // mount it on the Store
  const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
  );

  // then run the saga
  sagaMiddleware.run(rootSaga);

  return store;
}
