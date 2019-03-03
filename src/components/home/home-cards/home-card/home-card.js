import React from 'react';

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

export default HomeCard;
