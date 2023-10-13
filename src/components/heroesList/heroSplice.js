import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

export const fetchHeroes = createAsyncThunk(
    'hero/fetchHero',
    async () => {
        const request = useHttp();
        return await request("http://localhost:3001/heroes")
    }
)

const initialState = {
    heroes: [],
    heroesStatus: 'ide'
};

const heroSlice = createSlice({
    name: 'hero',
    initialState,
    reducers: {
        updateHeroesState_heroAdd: (state, action) => {
            state.heroes.push(action.payload)
        },
        updateHeroesState_heroDel: (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload.id)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchHeroes.pending, state => { state.heroesStatus = 'loading' });
        builder.addCase(fetchHeroes.fulfilled, (state, action) => {
            state.heroes = action.payload;
            state.heroesStatus = 'ide';
        });
        builder.addCase(fetchHeroes.rejected, state => { state.heroesStatus = 'error' })
    }
})
const { actions, reducer } = heroSlice;

export default reducer;
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    updateHeroesState_heroAdd,
    updateHeroesState_heroDel
} = actions