import React, {useState, useEffect} from 'react';
import * as Yup from "yup";
import axios from "axios";
import {Link} from 'react-router-dom';

export default function Form() {

  const initialFormState = {
    name: "",
    size: "",
    sauce: "",
    pepperoni: false,
    sausage: false,
    canadianbacon: false,
    chicken: false,
    veggies: false,
    pineapple: false,
    substitutions: "",
    special: "",
    quantity: "",
  };

  const [post, setPost] = useState([]);

  const [serverError, setServerError] = useState("");

  const [formState, setFormState] = useState(initialFormState);
  
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [errors, setErrors] = useState(initialFormState);

  const formSchema = Yup.object().shape({
    name: Yup.string().required("Name is required.").min(2, "Name must be at least 2 letters."),
    size: Yup.string().required("Must choose a size."),
    sauce: Yup.string().required("Must choose a sauce."),
    pepperoni: Yup.string(),
    sausage: Yup.string(),
    canadianbacon: Yup.string(),
    chicken: Yup.string(),
    veggies: Yup.string(),
    pineapple: Yup.string(),
    substitutions: Yup.string().required("Do you want gluten free?"),
    special: Yup.string(),
    quantity: Yup.string().required("Must choose QTY."),
  });
}