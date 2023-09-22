import { createStore, combineReducers } from 'redux';
import heroReducer from '../reducers/heroes';
import filterReducer from '../reducers/filters';

const store = createStore(combineReducers({ heroReducer, filterReducer }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;