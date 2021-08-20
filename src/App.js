import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Header";
import styled from "styled-components";
import Pic from "./components/Pic";
import Form from "./components/form";
import * as yup from "yup";
import schema from "./components/validations/formSchema";
import Success from "./components/success";
import axios from "axios";
import Pizza from "./components/Pizza";

const Container = styled.div`
  * {
    padding: 0px;
    margin: 0px;
    font-family: san-serif;
    text-align: center;
    color: dodgerblue;
  }
`;

const initialFormValues = {
  //Text
  username: "",
  special: "",
  //dropdown
  size: "",
  //checkboxes
  ham: false,
  olives: false,
  onions: false,
  cheese: false,
};

const initialFormErrors = {
  username: "",
  special: "",
  size: "",
};
const pizzaList = [];
const initialDisabled = true;

export default function App() {
  const [url, setUrl] = useState("https://buff.ly/2UybmBQ");
  const [pizzas, setPizzas] = useState(pizzaList);
  const [formValues, setFormValues] = useState(initialFormValues); // object
  const [formErrors, setFormErrors] = useState(initialFormErrors); // object
  const [disabled, setDisabled] = useState(initialDisabled); // boolean

  const orderSubmitted = (newpizza) => {
    return setPizzas(formValues)
  }

  const postNewPizza = (newPizza) => {
    axios
      .post("https://reqres.in/api/orders", newPizza)
      .then((res) => {
        setPizzas([...pizzas, res.data]);
        setFormValues(initialFormValues);
        console.log(`HERE is postNewPizza`, postNewPizza);
      })
      .catch((err) => {
        debugger;
        console.log(err);
      })
  };

  // VALIDATIONS
  const validate = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then((valid) => {
        //eslint-disable-line
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
  };

  //CHANGE HANDLER

  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({ ...formValues, [name]: value });
  };

  //SUBMIT HANDLER
  const formSubmit = () => {
    const newPizza = {
      username: formValues.username.trim(),
      special: formValues.special.trim(),
      size: formValues.size.trim(),
      ham: formValues.ham,
      olives: formValues.olives,
      onions: formValues.onions,
      cheese: formValues.cheese,
    }
    postNewPizza(newPizza);
  }

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
    });
  }, [formValues]);


  return (
    <Container>
      <Home
        id="order-pizza"
      />
      <Switch>
        <Route path="/pizza/success">
          <Success
            change={inputChange}
            values={formValues}
            submit={formSubmit}
            orders={pizzas}
          />
        </Route>
        <Route path="/pizza">
          <Form
            values={formValues}
            change={inputChange}
            submit={formSubmit}
            errors={formErrors}
          />
        </Route>

        <Route path="/">
          <Pic pic={url} />
        </Route>
      </Switch>
    </Container>
  );

}