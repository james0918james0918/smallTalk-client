import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Home from './components/home/home';
import Landing from './components/landing/landing';

const GuardedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem("user")
            ? <Component {...props} />
            : <Redirect to={{ pathname: "/landing", state: { from: props.location } }} />)} />
)

const routes = () => {
    return (
        <div>
            <GuardedRoute exact path="/" component={Home}></GuardedRoute>
            <Route path="/landing" component={Landing}></Route>
        </div>
    );
};

export default routes;
