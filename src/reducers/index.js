const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    selectedFilter: 'all'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload
            }
        case 'HEROES_UPDATE_ADD':
            return {
                ...state,
                heroes: [...state.heroes, action.payload]
            }
        case 'HEROES_UPDATE_DEL':
            return {
                ...state,
                heroes: state.heroes.filter(item => item.id !== action.payload.id)
            }
        case 'HEROES_FILTER_BY_ELEMENT':
            return{
                ...state,
               selectedFilter: action.payload
            }            
        default: return state
    }
}

export default reducer;