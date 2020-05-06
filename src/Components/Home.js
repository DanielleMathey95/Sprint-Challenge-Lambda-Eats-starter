import React from 'react';
import { Link, Route } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Route>
        <Link to="/Pizza">Order Here!</Link>
      </Route>
    </div>
  )
}

export default Home;