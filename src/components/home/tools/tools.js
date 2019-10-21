import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';
import SearchBar from '../search-bar/search-bar';
import './tools.scss';

const AddButton = ({ history, match }) => (
  <Button
    type="primary"
    ghost
    onClick={() => {
      history.push(`${match.url}/new-team`);
    }}
  >
  Add a new team
  </Button>
);

const AddButtonWithRouter = withRouter(AddButton);

const Tools = ({ queries, setQueries }) => (
  <div className="tools">
    <SearchBar
      queries={queries}
      setQueries={setQueries}
    />
    <AddButtonWithRouter />
  </div>
);
export default Tools;
