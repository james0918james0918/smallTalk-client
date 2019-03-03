import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../search-bar/search-bar';
import './tools.scss';
import '../add-button/add-button.scss';

const AddButton = ({ match }) => <Link to={`${match.url}/newTeam`} className="add-button" />;

const Tools = ({ findGroups, queries, deleteQuery, match }) => (
  <div className="tools">
    <SearchBar findGroups={findGroups}
               queries={queries}
               deleteQuery={deleteQuery} />
    <AddButton match={match} />
  </div>
);
export default Tools;
