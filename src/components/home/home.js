import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Tools from './tools/tools';
import HomeCards from './home-cards/home-cards';
import AddTeamForm from '../add-team-form/add-team-form';
import { TeamService } from '../../services/team-service';
import './home.scss';

const teamService = new TeamService();

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      queries: [],
      matchingGroups: [],
    };
    this.findGroups = this.findGroups.bind(this);
    this.deleteQuery = this.deleteQuery.bind(this);
  }

  async componentDidMount() {
    try {
      const res = await teamService.fetchTeams();
      this.setState({ groups: res.data });
    } catch (err) {
      console.log(err.message);
      if (err.response) this.props.history.push('/landing');
    }
  }

  findGroups(queryFromChild = '') {
    const queries = [...this.state.queries];
    if (queryFromChild) queries.push(queryFromChild);
    // at least contains one of the queries
    const matchingGroups = this.state.groups
      .filter(cur => queries.some(query => cur.name.includes(query)));
    this.setState({ queries, matchingGroups });
  }

  deleteQuery(target) {
    // delete the query and refind the matchingGroups
    this.setState({ queries: this.state.queries
      .filter(query => query !== target) }, this.findGroups);
  }

  render() {
    return (
      <section className="home">
        <Tools findGroups={this.findGroups}
          queries={this.state.queries}
          deleteQuery={this.deleteQuery}
          match={this.props.match} />
        <HomeCards groups={this.state.groups}
          queries={this.state.queries}
          matchingGroups={this.state.matchingGroups} />
      </section>
    );
  }
}

// DummyHome
export default ({ match }) => (
  <Switch>
    <Route exact path={`${match.path}/newTeam`} component={AddTeamForm} />
    <Route component={Home} />
  </Switch>
);
