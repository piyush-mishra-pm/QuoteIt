import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Users from './user/pages/Users';
import NewQuote from './quote/pages/NewQuote';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/quotes/new" exact>
          <NewQuote />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
