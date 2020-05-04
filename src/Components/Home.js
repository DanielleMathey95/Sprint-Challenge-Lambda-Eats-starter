import React from 'react';
import { Link, Route } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome To Lambda Eats!</h1>
      <button>Home</button>
      <button>Contact</button>
 
      <Route>
        <Link to="/Pizza">Order Here!</Link>
      </Route>
    </div>
  )
}

export default Home;