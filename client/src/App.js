import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home/Home';


function App() {
    
  return (
    <>
      <BrowserRouter basename='/code-land/'>
        <Switch>
          <Route
            path="/"
            exact
            component={Home}
          />
          {/* <Route
            path="/projects"
            exact
            component={Project}
          /> */}
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
