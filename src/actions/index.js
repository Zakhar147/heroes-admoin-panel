import { heroesFetched, heroesFetchingError} from '../components/heroesList/heroSplice';
import { filtersFetching, filtersFetched, filtersFetchingError} from '../components/heroesFilters/filterSlice';

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
      .then((res) => dispatch(filtersFetched(res)))
      .catch(() => filtersFetchingError());
}
