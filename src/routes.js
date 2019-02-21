import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import EmailVerification from './components/email-verification/email-verification';
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
  <Switch>
    <GuardedRoute exact path="/" component={Home} />
    <GuardedRoute exact path="/addTeam" component={AddTeamForm} />
    <Route exact path="/landing" component={Landing} />
    <Route path="/verification" component={EmailVerification} />
    <Route render={() => <p> 404 not found </p>} />
  </Switch>
);

export default routes;
