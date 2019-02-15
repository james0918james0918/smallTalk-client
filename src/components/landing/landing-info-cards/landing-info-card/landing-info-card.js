import React from 'react';

export default props => (
  <div className="customed--card">
    <figure className="customed--card__title--box">
      {props.icon}
      <h4 className="customed--card__title">{props.title}</h4>
    </figure>
    <p className="customed--card__description">
      {props.description}
    </p>
    <button type="button" className="customed--card__btn">Learn more</button>
  </div>
);
