import React, { Component } from 'react';

const HomeCard = ({ name, logoId }) => (
  <div className="home__card">
    <img
      src={`http://localhost:18080/public/team-logos/${logoId}.png`}
      alt="Your Team logo"
      className="home__card__img"
    />
    <p className="home__card__name"> {name} </p>
  </div>
);

export default class HomeCards extends Component {
  constructor(props) {
    super(props);
    this.createCards = this.createCards.bind(this);
    this.createMatchingCards = this.createMatchingCards.bind(this);
  }

  createMatchingCards() {
    return this.props.matchingGroups.map((item, index) => (
      <HomeCard name={item.name} logoId={item.logoId} key={index} />
    ));
  }

  createCards() {
    return this.props.groups.map((item, index) => (
      <HomeCard name={item.name} logoId={item.logoId} key={index} />
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
