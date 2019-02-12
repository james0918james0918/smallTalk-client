import React, { Component } from 'react';
import Card from './home-card/home-card';

export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.createCards = this.createCards.bind(this);
    this.createMatchingCards = this.createMatchingCards.bind(this);
  }

  createMatchingCards() {
    return this.props.matchingGroups.map((item, index) => (
      <Card title={item.title} key={index} />
    ));
  }

  createCards() {
    return this.props.groups.map((item, index) => (
      <Card title={item.title} key={index} />
    ));
  }

  render() {
    return (
      <div className="home__cards">
        {this.props.matchingGroups.length > 0
          ? this.createMatchingCards()
          : this.createCards()}
      </div>
    );
  }
}
