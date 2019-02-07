import React from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './loader-button.css';

export default ({
  isLoading,
  text,
  loadingText,
  className = '',
  disabled = false,
  ...props
}) => (
  <Button className={`loader-button ${className}`}
          disabled={disabled || isLoading} {...props}>
    {isLoading && <FontAwesomeIcon icon="spinner" spin /> }{' '}
    {isLoading ? loadingText : text}
  </Button>
);
