import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { useHttp } from "../../hooks/http.hook";

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
   async () => {
        const request = useHttp();
            const req = await request("http://localhost:3001/filters");
            console.log(req);
            return req
    }
)

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    selectedFilter: 'all'
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filterHeroes: (state, action) => {
            console.log(action.payload)
            state.selectedFilter = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFilters.pending, state => {

            state.filtersLoadingStatus = 'loading'
        });
        builder.addCase(fetchFilters.fulfilled, (state, action) => {
            console.log('in')
            state.filtersLoadingStatus = 'idle';
            state.filters = action.payload;
            console.log(action.payload)
        });
        builder.addCase(fetchFilters.rejected, (state) => {
            state.filtersLoadingStatus = 'error'
        })
    }
});

const { actions, reducer } = filterSlice;

export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    filterHeroes,
} = actions;
export default reducer