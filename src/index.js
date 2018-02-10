import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from '../src/routes';
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'))
registerServiceWorker();
