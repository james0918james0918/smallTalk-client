import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SpinnerContext } from '../../services/spinner-service';

export const Spinner = () => (
  <SpinnerContext.Consumer>
    {({ isSpinnerLoading }) => (
      isSpinnerLoading ? <FontAwesomeIcon icon="search" /> : null
    )}
  </SpinnerContext.Consumer>
);
