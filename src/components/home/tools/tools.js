import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../search-bar/search-bar';
import './tools.scss';
import '../add-button/add-button.scss';

const AddButton = () => <Link to="/addTeam" className="add-button" />;

const Tools = ({ findGroups, queryMatched }) => (
  <div className="tools">
    <SearchBar findGroups={findGroups}
               queryMatched={queryMatched} />
    <AddButton />
  </div>
);
export default Tools;
