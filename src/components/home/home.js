import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Tools from './tools/tools';
import HomeCards from './home-cards/home-cards';
import AddTeamForm from './add-team-form/add-team-form';
import NavBar from '../nav-bar/nav-bar';
import TeamPage from '../team-page/team-page';
import { fetchTeams } from '../../services/team-service';
import './home.scss';
import { useAsyncMountEffect } from '../../hooks/initializer';
import useFilterEffect from '../../hooks/filter';

const Home = (props) => {
  const [groups, setGroups] = useState([]);
  const [queries, setQueries] = useState([]);

  const initailizeTeams = async () => {
    try {
      const res = await fetchTeams();
      console.log('Init api call: ', res.data);
      setGroups(res.data);
    } catch (err) {
      props.history.push('/landing');
    }
  };

  useAsyncMountEffect(initailizeTeams);
  const matchingGroups = useFilterEffect(groups, queries);
  console.log('Before render matchingGroups: ', matchingGroups);
  return (
    <React.Fragment>
      <NavBar />
      <section className="home">
        <Tools
          queries={queries}
          setQueries={setQueries}
        />
        <HomeCards
          matchingGroups={matchingGroups}
        />
      </section>
    </React.Fragment>
  );
};


// DummyHome
export default ({ match }) => (
  <React.Fragment>
    <Switch>
      <Route exact path={`${match.url}/new-team`} component={AddTeamForm} />
      <Route exact path="/home" component={Home} />
      <Route path="/home/:teamId" component={TeamPage} />
    </Switch>
  </React.Fragment>
);
