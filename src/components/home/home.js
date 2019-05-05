import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Tools from './tools/tools';
import HomeCards from './home-cards/home-cards';
import AddTeamForm from './add-team-form/add-team-form';
import NavBar from '../nav-bar/nav-bar';
import TeamPage from '../team-page/team-page';
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
      // parse the query string
      const res = await teamService.fetchTeams();
      this.setState({ groups: res.data });
    } catch (err) {
      if (err.response) this.props.history.push('/landing');
    }
  }

  findGroups(...[queryFromChild, fromDeletion]) {
    const queries = [...this.state.queries];
    if (queryFromChild) queries.push(queryFromChild);
    let groupsToSearch = null;
    // Perform a full search when deletion occurs
    if (fromDeletion) groupsToSearch = this.state.groups;
    else {
      groupsToSearch = this.state.matchingGroups.length > 0
        ? this.state.matchingGroups
        : this.state.groups;
    }
    // at least contains one of the queries
    const matchingGroups = groupsToSearch
      .filter(cur => queries.some(query => cur.name.includes(query)));
    this.setState({ queries, matchingGroups });
  }

  deleteQuery(target) {
    // delete the query and refind the matchingGroups
    this.setState({ queries: this.state.queries
      .filter(query => query !== target) }, this.findGroups.bind(null, '', true));
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <section className="home">
          <Tools findGroups={this.findGroups}
            queries={this.state.queries}
            deleteQuery={this.deleteQuery}
          />
          <HomeCards groups={this.state.groups}
            queries={this.state.queries}
            matchingGroups={this.state.matchingGroups} />
        </section>
      </React.Fragment>
    );
  }
}

// DummyHome
export default ({ match }) => (
  <React.Fragment>
    <Switch>
      <Route exact path={`${match.url}/newTeam`} component={AddTeamForm} />
      <Route exact path="/home" component={Home} />
      <Route path="/home/:teamId" component={TeamPage} />
    </Switch>
  </React.Fragment>
);
