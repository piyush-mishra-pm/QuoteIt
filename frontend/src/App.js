import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Users from './user/pages/Users';
import NewQuote from './quote/pages/NewQuote';
import Navigation from './shared/components/Navigation/Navigation';

const App = () => {
  return (
      <Router>
          <Navigation />
          <main>
              <Switch>
                  <Route path="/" exact>
                      <Users />
                  </Route>
                  <Route path="/quotes/new" exact>
                      <NewQuote />
                  </Route>
                  <Redirect to="/" />
              </Switch>
          </main>
      </Router>
  );
};

export default App;
