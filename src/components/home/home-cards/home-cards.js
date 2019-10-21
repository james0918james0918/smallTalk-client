import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Icon } from 'antd';

const { Meta } = Card;
const HomeCard = ({ id, name, description, logoId, history, match }) => (
  <Card
    cover={(
      <img
        src={`http://localhost:18080/public/team-logos/${logoId}.png`}
        alt="Your Team logo"
        className="home__card__img"
      />
    )}
    actions={[
      <Icon type="star" />,
      <Icon type="setting" />,
      <Icon
        type="enter"
        onClick={() => {
          history.push(`${match.url}/${id}`, {
            // Pass the id of the team for later convenience
            teamId: id
          });
        }}
      />
    ]}
    style={{
      display: 'grid',
      gridTemplateRows: '20rem',
    }}
  >
    <Meta
      title={name}
      description={description}
    />
  </Card>
);

const HomeCardWithRouter = withRouter(HomeCard);

export default class HomeCards extends Component {
  constructor(props) {
    super(props);
    this.createMatchingCards = this.createMatchingCards.bind(this);
  }

  createMatchingCards() {
    return this.props.matchingGroups.map((item, index) => (
      <HomeCardWithRouter
        id={item.id}
        name={item.name}
        description={item.description}
        logoId={item.logoId}
        key={index}
      />
    ));
  }

  render() {
    return (
      <div className="home__cards">
        { this.createMatchingCards() }
      </div>
    );
  }
}
