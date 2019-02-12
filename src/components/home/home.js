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
          title: 'mygroup1'
        },
        {
          title: 'mygroup2'
        },
        {
          title: 'mygroup3'
        },
        {
          title: 'mygroup4'
        },
        {
          title: 'mygroup5'
        },
      ],
      queryMatched: '',
      matchingGroups: [],
    };
    this.findGroups = this.findGroups.bind(this);
  }

  findGroups(queryFromChild) {
    const matchingGroups = this.state.groups.filter(cur => cur.title.includes(queryFromChild));
    if (matchingGroups.length > 0) {
      // query successful, set flag to true
      this.setState({ queryMatched: queryFromChild, matchingGroups });
    } else {
      this.setState({ queryMatched: '', matchingGroups });
    }
  }

  render() {
    return (
      <section className="home">
        <Tools findGroups={this.findGroups}
          queryMatched={this.state.queryMatched} />
        <HomeCards groups={this.state.groups}
          queryMatch={this.state.queryMatch}
          matchingGroups={this.state.matchingGroups} />
      </section>
    );
  }
}
