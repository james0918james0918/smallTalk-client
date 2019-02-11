import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AddTeamForm from './components/add-team-form/add-team-form';
import Home from './components/home/home';
import Landing from './components/landing/landing';

const GuardedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('user')
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/landing', state: { from: props.location } }} />)} />
);

const routes = () => (
  <div>
    <GuardedRoute exact path="/" component={Home} />
    <GuardedRoute exact path="/addTeam" component={AddTeamForm} />
    <Route path="/landing" component={Landing} />
  </div>
);

export default routes;
