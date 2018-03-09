import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import './index.css';
import Routes from '../src/routes';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store';
const history = createHistory();
const store = configureStore({}, history);

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
