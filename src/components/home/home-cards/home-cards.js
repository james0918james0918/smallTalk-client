import React, { Component } from 'react';
import { Card, Icon } from 'antd';

const { Meta } = Card;
const HomeCard = ({ name, logoId }) => (
  <Card
    hoverable
    cover={(
      <img
        src={`http://localhost:18080/public/team-logos/${logoId}.png`}
        alt="Your Team logo"
        className="home__card__img"
      />
    )}
    actions={[
      <Icon type="star" />,
      <Icon type="setting" />
    ]}
    style={{
      display: 'grid',
      gridTemplateRows: '20rem',
    }}
  >
    <Meta
      title={`${name}`}
      description="this is your team description"
    />
  </Card>
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
