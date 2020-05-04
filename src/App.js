import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PizzaBuilder from "./Components/Form";
import Home from "./Components/Home";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/pizza" component={PizzaBuilder} />
          <Route path="/" component = {Home} />
        </Switch>
      </Router>
      
    </div>
  );
};
export default App;