import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tag } from 'antd';
import './search-bar.scss';

const SearchBarTag = props => (
  <Tag
    closable
    onClose={props.deleteQuery.bind(null, props.query)}
    color="volcano"
    visible
  >
    { props.query }
  </Tag>
);

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null,
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
