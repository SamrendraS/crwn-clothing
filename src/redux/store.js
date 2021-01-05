import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';

import rootReducer from './root-reducer';

const middlewares = [logger];
//logger prints out changes in state for debugging
//middleware between action and root reducer
export const store = createStore(rootReducer, applyMiddleware(...middlewares))

export const persistor = persistStore(store);
export default store;