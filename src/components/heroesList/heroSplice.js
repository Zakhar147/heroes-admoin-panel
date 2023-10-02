import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

const heroSlice = createSlice({  
    name: 'heroes',
    initialState,
    reducers: {
        heroesFetching: state => {state.heroesLoadingStatus = 'loading'},
        heroesFetched: (state, action)=> {
            state.heroes = action.payload
            state.heroesLoadingStatus = 'idle'
        },
        heroesFetchingError: state => {state.heroesLoadingStatus = 'error'},
        updateHeroesState_heroAdd: (state,action) => {state.heroes.push(action.payload)},
        updateHeroesState_heroDel: (state, action) => {state.heroes = state.heroes.filter(item => item.id !== action.payload.id)}
    }
});
const {actions, reducer} = heroSlice    

export default reducer;
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    updateHeroesState_heroAdd,
    updateHeroesState_heroDel
} = actions