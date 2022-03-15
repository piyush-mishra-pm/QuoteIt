import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';

import Users from './user/pages/Users';
import UserQuotes from './quote/pages/UserQuotes';
import NewQuote from './quote/pages/NewQuote';
import UpdateQuote from './quote/pages/UpdateQuote';
import Navigation from './shared/components/Navigation/Navigation';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';
import useAuth from './shared/hooks/auth-hook';

const App = () => {
    const { token, login, logout, userId } = useAuth();

    let routes;
    if (token) {
        routes = (
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
                <Redirect to="/" />
            </Switch>
        );
    }else{
        routes = (
            <Switch>
                <Route path="/" exact>
                    <Users />
                </Route>
                <Route path="/:userId/quotes" exact>
                    <UserQuotes />
                </Route>
                <Route path="/auth">
                    <Auth />
                </Route>
                <Redirect to="/auth" />
            </Switch>
        );
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: !!token,
                token: token,
                userId: userId,
                login: login,
                logout: logout,
            }}
        >
            <Router>
                <Navigation />
                <main>
                    {routes}
                </main>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
