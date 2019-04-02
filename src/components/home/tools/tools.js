import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';
import SearchBar from '../search-bar/search-bar';
import './tools.scss';

const AddButton = ({ history, match, location }) => (
  <Button
    type="primary"
    ghost
    onClick={() => {
      console.log(match.url);
      history.push(`${match.url}/newTeam`, { id: location.state.id });
    }}
  >
  Add a new team
  </Button>
);

const AddButtonWithRouter = withRouter(AddButton);

const Tools = ({ findGroups, queries, deleteQuery }) => (
  <div className="tools">
    <SearchBar findGroups={findGroups}
               queries={queries}
               deleteQuery={deleteQuery} />
    <AddButtonWithRouter />
  </div>
);
export default Tools;
