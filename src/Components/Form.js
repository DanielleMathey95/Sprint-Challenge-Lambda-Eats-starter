import React, {useState, useEffect} from 'react';
import axios from 'axios';
import * as Yup from 'yup';

const PizzaBuilder = () => {

  const initialState = {
    name: "",
    size: "",
    sauce: "",
    toppings: "",
    substitutions: "",
    special: "",
    quantity: ""
  }

  const [formState, setFormState] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [post, setPost] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const formSchema = Yup.object().shape({
    name: Yup.string().required("Name is a required field."),
    size: Yup.string().required("Please choose a size."),
    special: Yup.string(),
    quantity: Yup.string().required("Please choose a quantity"),
  });

  const validateChange = event => {
    Yup
      .reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then(_valid => {
        setErrors({...errors, [event.target.name]: "" });
      })
      .catch(err => {
        console.log("Something's wrong here", err);
        setErrors({...errors, [event.target.name]: err.errors[0] });
      });
  };
      console.log("Errors", errors);

      useEffect(() => {
        formSchema.isValid(formState)
          .then(valid => {
            console.log("is this valid?", valid);
            setIsButtonDisabled(!valid);
          });

      }, [formSchema, formState]);

  const formSubmit = event => {
    event.preventDefault();
    axios.post("https://reqres.in/api/users", formState)
          .then(response => {
            setPost(response.data);
            setFormState({
              name: "",
              size: "",
              sauce: "",
              toppings: "",
              substitutions: "",
              special: "",
              quantity: ""
            });
          })
        .catch(err => console.log(err.response))
  };

  const inputChange = event => {
    console.log("There's been an input change", event.target.value);
    event.persist();
    const newFormData = {
      ...formState, [event.target.name] : event.target.type === "checkbox" ? event.target.checked : event.target.value
    };
    validateChange(event);
    setFormState(newFormData);
  };

  return (
    <form onSubmit={formSubmit}>
      <label htmlfor="name">
        Name
        <input id="name" type="text" name="name" onChange={inputChange} value={formState.name} data-cy="name" />
        {errors.name.length > 0 ? (<p className="error">{errors.name}</p>): null}
      </label>

      <label htmlfor="size">Choose a Size
        <select id="size" name="size" onChange={inputChange}>
          <option value="">--Please choose a size--</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
          <option value="Family">Family Size</option>
        </select>
        {errors.size.length > 0 ? (<p className="errors">{errors.size}</p>): null}
      </label>

      <label htmlfor="sauce">Choose a sauce:
        <input type="radio" name="sauce" id="marinara" onChange={inputChange} value={formState.sauce}>Marinara</input>
        <input type="radio" name="sauce" id="alfredo" onChange={inputChange} value={formState.sauce}>Alfredo</input>
        <input type="radio" name="sauce" id="bbq" onChange={inputChange} value={formState.sauce}>BBQ</input>
        <input type="radio" name="sauce" id="spicy" onChange={inputChange} value={formState.sauce}>Spicy Marinara</input>
      </label>

      <label htmlfor="toppings">Select Your Toppings:
        <input type="checkbox" name="toppings" id="pepperoni" checked={formState.toppings} onChange={inputChange}>Pepperoni</input>
        <input type="checkbox" name="toppings" id="sausage" checked={formState.toppings} onChange={inputChange}>sausage</input>
        <input type="checkbox" name="toppings" id="chicken" checked={formState.toppings} onChange={inputChange}>Chicken</input>
        <input type="checkbox" name="toppings" id="canadianbacon" checked={formState.toppings} onChange={inputChange}>Canadian Bacon</input>
        <input type="checkbox" name="toppings" id="onions" checked={formState.toppings} onChange={inputChange}>Onions</input>
        <input type="checkbox" name="toppings" id="Peppers" checked={formState.toppings} onChange={inputChange}>Peppers</input>
        <input type="checkbox" name="toppings" id="mushrooms" checked={formState.toppings} onChange={inputChange}>Mushrooms</input>
        <input type="checkbox" name="toppings" id="pineapple" checked={formState.toppings} onChange={inputChange}>Pineapple</input>
      </label>

      <label htmlfor="special">Any special instructions?
        <input id="special" type="text" name="special" onChange={inputChange} value={formState.special} data-cy="special" />
      </label>

      <label htmlfor="quantity"> Choose a quantity
      <input type="number" id="quantity" name="quantity" min="1" max="5" onChange={inputChange} />
      {errors.quantity.length > 0 ? (<p className="errors">{errors.quantity}</p>): null}
      </label>

      <pre>{JSON.stringify(post, null, 2)}</pre>

      <button disabled={isButtonDisabled} type="submit">Submit Your Order</button>
    </form>
  )
}

export default PizzaBuilder;