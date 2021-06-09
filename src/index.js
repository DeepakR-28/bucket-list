import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {BrowserRouter} from 'react-router-dom'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './Store/reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<BrowserRouter>
                    <Provider store = {store}>
                        <App />
                    </Provider>
                </BrowserRouter>, 
            document.getElementById('root'));
registerServiceWorker();
