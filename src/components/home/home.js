import React, { Component } from 'react';
import Tools from './tools/tools';
import HomeCards from './home-cards/home-cards';
import './home.scss';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [
        {
          title: 'mygrou1'
        },
        {
          title: 'nba'
        },
        {
          title: 'mygroup3'
        },
        {
          title: 'tzuyu'
        },
        {
          title: 'my'
        },
      ],
      queries: [],
      matchingGroups: [],
    };
    this.findGroups = this.findGroups.bind(this);
    this.deleteQuery = this.deleteQuery.bind(this);
  }

  findGroups(queryFromChild = '') {
    const queries = [...this.state.queries];
    if (queryFromChild) queries.push(queryFromChild);
    // at least contains one of the queries
    const matchingGroups = this.state.groups
      .filter(cur => queries.some(query => cur.title.includes(query)));
    this.setState({ queries, matchingGroups });
  }

  deleteQuery(target) {
    console.log(target);
    // delete the query and refind the matchingGroups
    this.setState({ queries: this.state.queries
      .filter(query => query !== target) }, this.findGroups);
  }

  render() {
    return (
      <section className="home">
        <Tools findGroups={this.findGroups}
          queries={this.state.queries}
          deleteQuery={this.deleteQuery} />
        <HomeCards groups={this.state.groups}
          queries={this.state.queries}
          matchingGroups={this.state.matchingGroups} />
      </section>
    );
  }
}
