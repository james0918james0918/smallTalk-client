import React from 'react';

export const SpinnerContext = React.createContext({
  isSpinnerLoading: false,
  toggleSpinner: () => {}
});
