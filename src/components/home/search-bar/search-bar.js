import React, { Component } from 'react';
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
        <button className="searchbar__btn" type="button" onClick={this.submit}>search</button>
        <div className="searchbar__tag"> {this.props.queryMatched} </div>
        <input className="searchbar__input" name="query" type="text" placeholder="Search for your group" onChange={this.handleQueryOnChange} />
      </div>
    );
  }
}
