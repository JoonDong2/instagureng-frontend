import React from 'react';
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import Feed from '../Routes/Feed';
import Auth from '../Routes/Auth';
import Explore from '../Routes/Explore';
import Search from '../Routes/Search';
import Profile from '../Routes/Profile';
import Post from "../Routes/Post";

const LoggedInRoutes = () => (
    <Switch>
        <Route exact path="/" component={Feed} />
        <Route path="/explore" component={Explore} />
        <Route path="/s/:term" component={Search} />
        <Route path="/p/:postid" component={Post} />
        <Route path="/u/:username" component={Profile} />
        <Redirect from="*" to="/" />
    </Switch>
);

const LoggedOutRoutes = () => (
    <Switch>
        <Route exact path="/" component={Auth} />
        <Redirect from="*" to="/" />
    </Switch>
);

const AppRouter = ({ isLoggedIn }) => (
    <>{isLoggedIn ? <LoggedInRoutes/> : <LoggedOutRoutes/>}</>
);

AppRouter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;