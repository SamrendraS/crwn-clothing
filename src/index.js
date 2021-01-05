import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; //routing in app
import { Provider } from 'react-redux'; //redux store
import {PersistGate} from 'redux-persist/integration/react'; //local storage

import './index.css';
import App from './App';

import { store, persistor} from './redux/store';

ReactDOM.render(
  <Provider store={store}> 
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);