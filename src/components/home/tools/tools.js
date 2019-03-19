import React from 'react';
import { Button } from 'antd';
import SearchBar from '../search-bar/search-bar';
import './tools.scss';

const AddButton = ({ username, url }) => (
  <Button
    type="primary"
    ghost
  >
  Add a new team
  </Button>
);

const Tools = ({ findGroups, queries, deleteQuery, url, username }) => (
  <div className="tools">
    <SearchBar findGroups={findGroups}
               queries={queries}
               deleteQuery={deleteQuery} />
    <AddButton username={username} url={url} />
  </div>
);
export default Tools;
