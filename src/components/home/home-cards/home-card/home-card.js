import React from 'react';

const Card = ({ title }) => (
  <div className="home__card">
    <img
      src="http://localhost:18080/assets/teamwork.jpg"
      alt="Your Team logo"
      className="home__card__img"
    />
    <p className="home__card__title"> {title} </p>
  </div>
);

export default Card;
