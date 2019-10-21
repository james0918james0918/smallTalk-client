import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tag } from 'antd';
import './search-bar.scss';

const SearchBarTag = props => (
  <Tag
    closable
    onClose={props.onClose}
    color="volcano"
    visible
  >
    { props.query }
  </Tag>
);

const SearchBar = ({ queries, setQueries }) => {
  // Access input element
  const inputEl = React.useRef(null);
  // Factory function for individual tag to delete its only query
  const deleteQueryFactory = targetQ => () => {
    setQueries(queries.filter(query => query !== targetQ));
  };
  const testQueries = () => {
    const query = inputEl.current.value;
    if (query && !queries.includes(query)) {
      setQueries([...queries, query]);
    }
  };

  return (
    <div className="search--bar">
      <button
        className="search--bar__btn"
        type="button"
        onClick={testQueries}
      >
        <FontAwesomeIcon icon="search" />
      </button>
      <input
        className="search--bar__input"
        name="query"
        type="text"
        placeholder="Search for your group"
        ref={inputEl}
      />
      {
        queries.map((item, index) =>
          <SearchBarTag query={item} key={index} onClose={deleteQueryFactory(item)} />)
      }
    </div>
  );
};

export default SearchBar;
