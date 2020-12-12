import React from "react";
import {Route,Switch} from 'react-router-dom'
import "./App.css";
import Bookings from './components/pages/bookings/bookings'
import Home from './components/pages/home/home'


function App() {
  return (
    <div className="App">
      <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route exact={true} path="/bookings" component={Bookings} />
      </Switch>
    </div>
  );
}

export default App;
