import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './search-bar.scss';

export default class Searchbar extends Component {
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
      <div className="searchbar">
        <button className="searchbar__btn" type="button" onClick={this.submit}>
          <FontAwesomeIcon icon="search" className="searchbar__btn__icon" />
        </button>
        <input className="searchbar__input" name="query" type="text" placeholder="Search for your group" onChange={this.handleQueryOnChange} />
        <div>{this.state.query}</div>
      </div>
    );
  }
}
