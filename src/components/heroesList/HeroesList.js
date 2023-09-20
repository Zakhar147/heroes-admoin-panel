import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const { heroes, heroesLoadingStatus, selectedFilter } = useSelector(state => state);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner />;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr, selectedFilter) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        const filterHeroes = selectedFilter === 'all'
                           ? arr 
                           : arr.filter(item => item.element === selectedFilter);
        
        return filterHeroes.map(({id, ...props}) => <HeroesListItem key={id} {...props} id={id} />)
    }

    const elements = renderHeroesList(heroes, selectedFilter);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;