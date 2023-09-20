import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import { v4 as uuidv4 } from "uuid";
import * as Yup from 'yup'

import {filtersFetching, filtersFetched, filtersFetchingError } from "../../actions";

import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateHeroesState_heroAdd } from "../../actions";

import Spinner from "../spinner/Spinner";

const HeroesAddForm = () => {
  const { filters, filtersLoadingStatus } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(filtersFetching())
    request("http://localhost:3001/filters")
      .then((res) => dispatch(filtersFetched(res)))
      .catch(() => filtersFetchingError());
  }, []);


  if (filtersLoadingStatus === "loading") {
    return <Spinner />;
  } else if (filtersLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderFilters = (arr) => {
    return arr.map((item, index) => {
      return (
        <option key={index} value={item.name}>
          {item.name}
        </option>
      );
    });
  };

  const filtersNodes = renderFilters(filters);

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(2, 'Минимум 2 символа!')
          .required('Обазательное поле!'),
        description: Yup.string()
          .min(10, 'Не мнее 10 символов')
          .required('Обазательное поле!'),
        element: Yup.string()
          .required('Обязательное поле')
          .notOneOf(['Я владею элементом...'], 'Выберите элемент')
      })}
      onSubmit={(values) => {
        const data = JSON.stringify({ id: uuidv4(), ...values }, null, 2);
        request("http://localhost:3001/heroes", "POST", data)
          .then(request("http://localhost:3001/heroes"))
          .then(data => dispatch(updateHeroesState_heroAdd(data)))
      }}
    >
      <Form className="border p-4 shadow-lg rounded">
        <div className="mb-3">
          <label htmlFor="name" className="form-label fs-4">
            Name
          </label>
          <Field
            required
            name="name"
            className="form-control"
            id="name"
            placeholder="What is my name?"
            type="text"
          />
          <ErrorMessage style={{ color: 'red' }} name='name' component='div' />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label fs-4">
            Description
          </label>
          <Field
            as="textarea"
            required
            name="description"
            className="form-control"
            id="description"
            placeholder="What can I do?"
            style={{ height: "130px" }}
          />
          <ErrorMessage style={{ color: 'red' }} name='description' component='div' />

        </div>

        <div className="mb-3">
          <label htmlFor="element" className="form-label">
            Select hero element
          </label>
          <Field
            as="select"
            required
            className="form-select"
            id="element"
            name="element"
          >
            <option>I own the element...</option>
            {filtersNodes}
          </Field>
          <ErrorMessage style={{ color: 'red' }} name='element' component='div' />

        </div>

        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </Form>
    </Formik>
  );
};

export default HeroesAddForm;
