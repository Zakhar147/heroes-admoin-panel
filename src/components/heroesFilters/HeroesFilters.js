import { useEffect, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import { filtersFetched } from "../../actions";
import { filterHeroes } from "../../actions";
import classNames from 'classnames'

const HeroesFilters = () => {
  const { request } = useHttp();
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state);
  const[active, setActive] = useState(null)

  useEffect(() => {
    request("http://localhost:3001/filters").then((res) =>
      dispatch(filtersFetched(res))
    );
  }, []);

  const btnOnClick = (e, item) => {
    dispatch(filterHeroes(item.name));
    setActive(item.name)

  }

  const renderFilters = (arr) => {
    return arr.map((item, index) => {
      return (
        <button
          onClick={(e) => btnOnClick(e,item)}
          key={index}
          className={classNames(`${item.className}`, {
            'active': item.name === active
        })}
        >
          {item.name}
        </button>
      );
    });
  };

  const filtersNodes = renderFilters(filters);

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Filter heroes by filter</p>
        <div className="btn-group">{filtersNodes}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;
