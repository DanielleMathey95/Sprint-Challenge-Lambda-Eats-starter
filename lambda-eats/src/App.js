import React from 'react';
import Form from './Components/Form';
import {Route, Link } from 'react-router-dom';

const App = () => {
  return (
    <section>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/pizza">Pizza</Link>
      </nav>
      <Route exact path="/">
        <h1>Welcome to Lambda Eats!</h1>
      </Route>
      <Route path="/pizza" component={Form} />
    </section>
  )
};

export default App;
