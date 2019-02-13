import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './search-bar.scss';

const SearchBarTag = props =>
  props.queryMatched ? (
    <div className="search--bar__tag">
      <FontAwesomeIcon icon="times-circle" className="search--bar__btn__icon" />
      <span>{props.queryMatched}</span>
    </div>
  ) : null;

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
    return (
      <div className="search--bar">
        <button
          className="search--bar__btn"
          type="button"
          onClick={this.submit}
        >
          <FontAwesomeIcon icon="search" className="search--bar__btn__icon" />
        </button>
        <input
          className="search--bar__input"
          name="query"
          type="text"
          placeholder="Search for your group"
          onChange={this.handleQueryOnChange}
        />
        <SearchBarTag queryMatched={this.props.queryMatched} />
      </div>
    );
  }
}
