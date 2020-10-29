import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import About from "./routes/About";
import Home from "./routes/Home";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Route path='/' exact={true} component={Home} />{" "}
      <Route path='/about' component={About} />{" "}
    </BrowserRouter>
  );
}

export default App;
