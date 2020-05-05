import React, {useState, useEffect} from 'react';
import axios from 'axios';
import * as Yup from 'yup';

const PizzaBuilder = () => {

  const initialState = {
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

  const [formState, setFormState] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [post, setPost] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const formSchema = Yup.object().shape({
    name: Yup.string().required("Name is a required field."),
    size: Yup.string().required("Please choose a size."),
    sauce: Yup.boolean().required("Please choose a sauce"),
    pepperoni: Yup.boolean().defined(),
    sausage: Yup.boolean().defined(),
    chicken: Yup.boolean().defined(),
    canadianbacon: Yup.boolean().defined(),
    onions: Yup.boolean().defined(),
    mushrooms: Yup.boolean().defined(),
    peppers: Yup.boolean().defined(),
    pineapple: Yup.boolean().defined(),
    special: Yup.string().notRequired(),
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
            console.log("Success", post);
            console.log(response.data.size)
            setFormState({
              name: "",
              size: response.data.size,
              sauce: "",
              toppings: "",
              pepperoni: false,
              sausage: false,
              chicken: false,
              canadianbacon: false,
              onions: false,
              mushrooms: false,
              peppers: false,
              pineapple: false,
              special: "",
              quantity: ""
            });
          })
        .catch(err => console.log(err.response))
  };

  const sent = (event) => {
    event.preventDefault();
    alert("Your order has been placed")
  }

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
          onChange={inputChange} 
          checked={formState.sauce} /> Marinara

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

      <label htmlfor="toppings">
        <input 
          type="checkbox" 
          name="pepperoni"
          checked={formState.pepperoni}
          onChange={inputChange}
          data-cy="pepperoni"  
          />Pepperoni

        <input 
          type="checkbox" 
          name="sausage"
          data-cy="sausage"
          checked={formState.sausage}
          onChange={inputChange} 
          />Sausage
        
        <input 
          type="checkbox" 
          name="chicken"
          data-cy="chicken"
          checked={formState.chicken}
          onChange={inputChange} 
         />Chicken
        
        <input 
          type="checkbox" 
          name="canadianbacon"
          data-cy="canadianbacon"
          checked={formState.canadianbacon}
          onChange={inputChange}   
         />Canadian Bacon
    
        <input 
          type="checkbox" 
          name="onions"
          data-cy="onions"
          checked={formState.onions}
          onChange={inputChange}   
         />Onions
        
        <input 
          type="checkbox" 
          name="peppers"
          data-cy="peppers"
          checked={formState.peppers}
          onChange={inputChange}  
          />Peppers
        
        <input 
          type="checkbox" 
          name="mushrooms"
          data-cy="mushrooms"
          checked={formState.mushrooms}
          onChange={inputChange} 
          />Mushrooms
        
        <input 
          type="checkbox" 
          name="pineapple"
          data-cy="pineapple"
          checked={formState.pineapple}
          onChange={inputChange}  
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
      {errors.quantity.length > 0 ? (<p className="errors">{errors.quantity}</p>): null}
      </label>

      <pre>{JSON.stringify(post, null, 2)}</pre>

      <button disabled={isButtonDisabled} onSubmit={sent} type="submit">Submit Your Order</button>

    </form>
  );
}

export default PizzaBuilder;