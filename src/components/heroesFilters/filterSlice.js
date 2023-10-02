import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    selectedFilter: 'all'
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersFetching: state => {
            state.filtersLoadingStatus = 'loading'
        },
        filtersFetched: (state, action) => {
            state.filtersLoadingStatus = 'ide';
            state.filters = action.payload
        },
        filtersFetchingError: (state) => {
            state.filtersLoadingStatus = 'error'
        },
        filterHeroes: (state, action) => {
            state.selectedFilter = action.payload
        },
    }
});

const { actions, reducer } = filterSlice;
console.log(actions)

export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    filterHeroes,
} = actions;
export default reducer