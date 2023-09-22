import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import { createSelector } from '@reduxjs/toolkit';

const HeroesList = () => {
    const { heroesLoadingStatus } = useSelector(state => state.heroReducer);

    const filteredHeroesSelector = createSelector(
        (state) => state.heroReducer.heroes,
        (state) => state.filterReducer.selectedFilter,
        (heroes, selectedFilter) => {
            return selectedFilter == 'all'
                ? heroes
                : heroes.filter(item => item.element === selectedFilter)

        }
    )

    const filteredElements = useSelector(filteredHeroesSelector)
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner />;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
       return  arr.length === 0 
                     ? <h5 className="text-center mt-5">Героев пока нет</h5>
                     : arr.map(({ id, ...props }) => <HeroesListItem key={id} {...props} id={id} />)
    }

    const elements = renderHeroesList(filteredElements);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;