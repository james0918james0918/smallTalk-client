import React, { Component } from 'react';
import axios from 'axios';

import {
  ListGroup,
  ListGroupItem
} from 'reactstrap';

class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: []
    }
  }

  componentDidMount() {
    this.setState({ formData });
    this.setState({
      teams: [
        "Team 1",
        "Team 2",
        "Team 3"
      ]
    });
  }

  render() {
    let teamList = this.state.teams.map((team) => {
      return (
        <ListGroupItem>{team.name}</ListGroupItem>
      )
    });

    return (
      <div>
        <ListGroup>
          {teamList}
        </ListGroup>
      </div>
    )
  }
}

export default SideBar;
