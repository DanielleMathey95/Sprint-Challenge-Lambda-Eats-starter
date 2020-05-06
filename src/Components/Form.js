import React, {useState, useEffect} from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import {Form} from './Styles';

const PizzaBuilder = () => {

  const initialFormState = {
    name: "",
    size: "",
    sauce: "",
    toppings: "",
    pepperoni: "",
    sausage: "",
    chicken: "",
    canadianbacon: "",
    onions: "",
    mushrooms: "",
    peppers: "",
    pineapple: "",
    special: "",
    quantity: ""
  }

  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState(initialFormState);
  const [post, setPost] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const formSchema = Yup.object().shape({
    name: Yup.string().required("Name is a required field."),
    size: Yup.string(),
    sauce: Yup.string(),
    special: Yup.string().notRequired(),
    quantity: Yup.number().required("Please choose a quantity"),
  });

  const validateChange = event => {
    Yup
        .reach(formSchema, event.target.name)
        .validate(event.target.value)
        .then(_valid => {
        setErrors({ ...errors, [event.target.name]: "" });
    })
    .catch(err => {
        console.log("somethings wrong here", err);
        setErrors({ ...errors, [event.target.name]: err.errors[0] });
    });
};
console.log("error state", errors);


      useEffect(() => {
        formSchema.isValid(formState).then(valid => {
          console.log("is this valid?", valid);
          setIsButtonDisabled(!valid);
        })
      }, [formState]);

  const formSubmit = event => {
    event.preventDefault();
    axios.post("https://reqres.in/api/users", formState)
          .then(response => {
            setPost(response.data);
            console.log("Success", post);
            console.log(response.data.size)
            setFormState({
              name: "",
              size: "",
              sauce: "",
              toppings: "",
              special: "",
              quantity: ""
            });
          })
        .catch(err => console.log("Post error:", err.response))
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
      <Form>
      <label htmlfor="name">
        Name
        <input 
          id="name" 
          type="text" 
          name="name" 
          onChange={inputChange} 
          value={formState.name} 
          data-cy="name" />
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
        <input 
          type="radio" 
          name="sauce" 
          id="marinara"
          value={formState.sauce}
          onChange={inputChange} 
          
          /> Marinara

        <input 
          type="radio" 
          name="sauce" 
          id="alfredo"
          onChange={inputChange} 
          value={formState.sauce} /> Alfredo

        <input 
          type="radio" 
          name="sauce" 
          id="bbq"
          onChange={inputChange} 
          value={formState.sauce} />BBQ

        <input 
          type="radio" 
          name="sauce" 
          id="spicy"
          onChange={inputChange} 
          value={formState.sauce}/>Spicy Marinara
      </label>

      <label htmlfor="toppings"> Toppings:

        <input 
          type="checkbox" 
          name="pepperoni"
          data-cy="pepperoni"  
          />Pepperoni
        
        <input 
          type="checkbox" 
          name="sausage"
          data-cy="sausage"
          />Sausage

        <input 
          type="checkbox" 
          name="chicken"
          data-cy="chicken"
         />Chicken
        
        <input 
          type="checkbox" 
          name="canadianbacon"
          data-cy="canadianbacon"
         />Canadian Bacon
    
        <input 
          type="checkbox" 
          name="onions"
          data-cy="onions"
         />Onions
        
        <input 
          type="checkbox" 
          name="peppers"
          data-cy="peppers"
          />Peppers
        
        <input 
          type="checkbox" 
          name="mushrooms"
          data-cy="mushrooms"
          />Mushrooms
        
        <input 
          type="checkbox" 
          name="pineapple"
          data-cy="pineapple"
         />Pineapple
      
      </label>

      <label htmlfor="special">Special Instructions
        <textarea 
          name="special"
          id="specialInput"
          placeholder="Anything to Add?"
          onChange={inputChange}
          value={formState.special} />
      </label>

      <label htmlfor="quantity"> Choose a quantity
      <input type="number" id="quantity" name="quantity" min="1" max="5" onChange={inputChange} />
      </label>

      <pre>{JSON.stringify(post, null, 2)}</pre>

      <button data-cy="submitButton" disabled={isButtonDisabled} type="submit">Submit Your Order</button>

      </Form>

    </form>
  );
}

export default PizzaBuilder;