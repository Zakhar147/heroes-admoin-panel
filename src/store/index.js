import { configureStore } from '@reduxjs/toolkit'
import  heroReducer from '../components/heroesList/heroSplice';
import filterReducer from "../components/heroesFilters/filterSlice";

const reducer = {
    heroReducer: heroReducer,
    filterReducer: filterReducer
}

const stringMiddleare = () => (next) => (action) => {
    if (typeof action == 'string') {
        return next({ type: action })
    }
    return next(action)
}



const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleare)
});


export default store;



