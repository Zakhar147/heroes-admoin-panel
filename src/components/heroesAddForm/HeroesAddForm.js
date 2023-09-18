import {useHttp} from '../../hooks/http.hook';
import { filtersFetched } from '../../actions';

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const {filters} = useSelector(state=>state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(()=>{
        request("http://localhost:3001/filters")
               .then(res=>dispatch(filtersFetched(res)))
    }, [])

    const renderFilters = (arr) => {
        return arr.map((item, index) => {
           return (
            <option key={index} value={item}>{item}</option>
           ) 
        })
    }

    const filtersNodes = renderFilters(filters);
   

    return (
        <form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                    <option >Я владею элементом...</option>
                    {filtersNodes}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;