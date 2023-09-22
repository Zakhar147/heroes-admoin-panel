const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    selectedFilter: 'all'
}

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'HEROES_FILTER_BY_ELEMENT':
            return {
                ...state,
                selectedFilter: action.payload
            }
        default: return state
    }
}

export default filterReducer;