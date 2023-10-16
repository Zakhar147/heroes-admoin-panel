import { v4 as uuidv4 } from 'uuid';

import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAll } from './heroSplice';

import { fetchHeroes } from './heroSplice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import { createSelector } from '@reduxjs/toolkit';

const HeroesList = () => {

    const filteredHeroesSelector = createSelector(
        (state) => state.heroReducer.heroes,
        (state) => state.filterReducer.selectedFilter,
        (heroes, selectedFilter) => {
            return selectedFilter === 'all'
                ? heroes
                : heroes.filter(item => item.element === selectedFilter)

        }
    )

    const heroesLoadingStatus = useSelector(state => state.heroReducer.heroesLoadingStatus);
    const filteredElements = useSelector(filteredHeroesSelector)
    const dispatch = useDispatch();
    // const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes())
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner />;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        return arr.length === 0
            ? <h5 className="text-center mt-5">Героев пока нет</h5>
            : arr.map(({ id, ...props }) => <HeroesListItem key={uuidv4()} {...props} id={id} />)
    }

    const elements = renderHeroesList(filteredElements);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;