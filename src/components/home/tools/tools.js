import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../search-bar/search-bar';
import './tools.scss';
import '../add-button/add-button.scss';

const AddButton = ({ username, url }) => <Link to={{ pathname: `${url}/newTeam`, search: `?username=${username}` }} className="add-button" />;

const Tools = ({ findGroups, queries, deleteQuery, url, username }) => (
  <div className="tools">
    <SearchBar findGroups={findGroups}
               queries={queries}
               deleteQuery={deleteQuery} />
    <AddButton username={username} url={url} />
  </div>
);
export default Tools;
