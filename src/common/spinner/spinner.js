import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SpinnerContext } from '../../services/spinner-service';
import './spinner.scss';

export const Spinner = () => (
  <SpinnerContext.Consumer>
    {({ isSpinnerLoading }) =>
      isSpinnerLoading ? (
        <div className="spinner-wrapper">
          <FontAwesomeIcon className="spinner" icon="spinner" />
        </div>
      ) : null
    }
  </SpinnerContext.Consumer>
);
