import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import { v4 as uuidv4 } from "uuid";

import { useHttp } from "../../reducers/http.hook";
import { filtersFetched } from "../../actions";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateHeroesState_heroAdd } from "../../actions"; 


const HeroesAddForm = () => {
  const { filters } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    request("http://localhost:3001/filters").then((res) =>
      dispatch(filtersFetched(res))
    );
  }, []);

  const renderFilters = (arr) => {
    return arr.map((item, index) => {
      return (
        <option key={index} value={item}>
          {item}
        </option>
      );
    });
  };

  const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
      <>
        <label htmlFor={props.name}>{label}</label>
        <input {...props} {...field} />
        {meta.touched && meta.error ? (
          <div style={{ color: "red" }}>{meta.error}</div>
        ) : null}
      </>
    );
  };

  const filtersNodes = renderFilters(filters);

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
      }}
      onSubmit={(values) => {
        const data = JSON.stringify({id: uuidv4(), ...values}, null, 2);
        request("http://localhost:3001/heroes", "POST", data)
               .then(request("http://localhost:3001/heroes"))
               .then(data => dispatch(updateHeroesState_heroAdd(data)))
      }}
    >
      <Form className="border p-4 shadow-lg rounded">
        <div className="mb-3">
          <MyTextInput
            label="Имя нового героя"
            type="text"
            name="name"
            className="form-control"
            id="name"
            placeholder="Как меня зовут?"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="text" className="form-label fs-4">
            Описание
          </label>
          <Field
            as="textarea"
            required
            name="description"
            className="form-control"
            id="text"
            placeholder="Что я умею?"
            style={{ height: "130px" }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="element" className="form-label">
            Выбрать элемент героя
          </label>
          <Field
            as="select"
            required
            className="form-select"
            id="element"
            name="element"
          >
            <option>Я владею элементом...</option>
            {filtersNodes}
          </Field>
        </div>

        <button type="submit" className="btn btn-primary">
          Создать
        </button>
      </Form>
    </Formik>
  );
};

export default HeroesAddForm;
