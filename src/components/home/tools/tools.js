import React from 'react';
import Searchbar from '../search-bar/search-bar';
import AddButton from '../add-button/add-button';
import './tools.scss';

const Tools = ({ findGroups, queryMatched }) => (
  <div className="tools">
    <Searchbar findGroups={findGroups}
               queryMatched={queryMatched} />
    <AddButton />
  </div>
);
export default Tools;
