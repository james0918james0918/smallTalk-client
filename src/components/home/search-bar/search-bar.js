import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './search-bar.scss';

const SearchBarTag = (props) => {
  return (
    <button type="button" className="search--bar__tag" onClick={props.deleteQuery.bind(null, props.query)}>
      <FontAwesomeIcon icon="times-circle" className="search--bar__tag__icon" />
      <span className="search--bar__tag__text">{props.query}</span>
    </button>
  );
};

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null
    };
    this.submit = this.submit.bind(this);
    this.handleQueryOnChange = this.handleQueryOnChange.bind(this);
  }

  submit() {
    // find matching groups
    this.props.findGroups(this.state.query);
  }

  handleQueryOnChange(e) {
    this.setState({ query: e.target.value });
  }

  render() {
    console.log(this.props.queries);
    return (
      <div className="search--bar">
        <button
          className="search--bar__btn"
          type="button"
          onClick={this.submit}
        >
          <FontAwesomeIcon icon="search" />
        </button>
        <input
          className="search--bar__input"
          name="query"
          type="text"
          placeholder="Search for your group"
          onChange={this.handleQueryOnChange}
        />
        {
          this.props.queries.map((item, index) =>
            <SearchBarTag query={item} deleteQuery={this.props.deleteQuery} key={index} />)
        }
      </div>
    );
  }
}
