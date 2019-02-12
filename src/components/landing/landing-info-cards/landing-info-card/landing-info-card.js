import React from 'react';

export default props => (
  <div className="customedCard">
    <figure className="customedCard__titleBox">
      {props.icon}
      <h4 className="customedCard__title">{props.title}</h4>
    </figure>
    <p className="customedCard__description">
      {props.description}
    </p>
    <button type="button" className="customedCard__btn">Learn more</button>
  </div>
);
