import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Projects from './components/Projects';

function App() {

  return (
    <div className="wrapper">
      <Navbar />
      <BrowserRouter basename='/code-land/'>
        <Switch>
          <Route
            path="/"
            exact
            component={Home}
          />
          <Route
            path="/projects"
            exact
            component={Projects}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
