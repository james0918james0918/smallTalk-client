import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import TeamMenu from './team-menu/team-menu';
import Announcement from './announcement/announcement';
import Editor from '../../common/editor/editor';
import './team-page.scss';

export default class TeamPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // id: 1,
    };
  }

  render() {
    const { match, location } = this.props;
    return (
      <section className="team-page">
        <TeamMenu />
        <Switch>
          {/* Announcement is the default element */}
          <Redirect
            exact
            from={`${match.url}`}
            to={{
              pathname: `${match.url}/announcement`,
              state: { teamId: location.state.teamId }
            }}
          />
          <Route exact path={`${match.url}/announcement`} component={Announcement} />
          <Route exact path={`${match.url}/:functionality/editing`} component={Editor} />
        </Switch>
      </section>
    );
  }
}
