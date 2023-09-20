export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}
export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}
export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}
export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const updateHeroesState_heroAdd = (data) => {
    return {
        type: 'HEROES_UPDATE_ADD',
        payload: data
    }
}

export const updateHeroesState_heroDel = (data) => {
    return {
        type: 'HEROES_UPDATE_DEL',
        payload: data
    }
}

export const filterHeroes = (filterName) => {
    return {
        type: 'HEROES_FILTER_BY_ELEMENT',
        payload: filterName
    }
}
