import React, { Component } from 'react';
import Card from './landing-info-card/landing-info-card';
import svgIcons from '../../../common/svg-icons/svg-icons';

import './landing-info-cards.scss';

class LandingInfoCards extends Component {
  constructor(props) {
    super(props);
    this.createCards.bind(this);
  }

  createCards() {
    // key attributes are required in an array of JSX elements
    return this.props.textGroup.map(
      (item, index) => (
        <Card title={item.title}
              description={item.description}
              icon={svgIcons[index]} key={index}
        />
      )
    );
  }

  render() {
    return (
      <section className="cards">
        <h1 className="cards__header">{this.props.headerText}</h1>
        <p className="cards__intro"> Manage the team in the way you can&#39;t even imagine. </p>
        <div className="cards__cards--area">
          {this.createCards()}
        </div>
      </section>
    );
  }
}

export default LandingInfoCards;
