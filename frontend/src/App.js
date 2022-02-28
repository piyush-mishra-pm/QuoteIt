import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Users from './user/pages/Users';
import UserQuotes from './quote/pages/UserQuotes';
import NewQuote from './quote/pages/NewQuote';
import UpdateQuote from './quote/pages/UpdateQuote';
import Navigation from './shared/components/Navigation/Navigation';
import Auth from './user/pages/Auth';

const App = () => {
  return (
      <Router>
          <Navigation />
          <main>
              <Switch>
                  <Route path="/" exact>
                      <Users />
                  </Route>
                  <Route path="/:userId/quotes" exact>
                      <UserQuotes />
                  </Route>
                  <Route path="/quotes/new" exact>
                      <NewQuote />
                  </Route>
                  {/* '/quotes/new' route needs to come before '/quotes/:quoteId' */}
                  <Route path="/quotes/:quoteId">
                      <UpdateQuote />
                  </Route>
                  <Route path="/auth">
                      <Auth />
                  </Route>
                  <Redirect to="/" />
              </Switch>
          </main>
      </Router>
  );
};

export default App;
