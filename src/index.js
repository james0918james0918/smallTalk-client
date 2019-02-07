import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { render } from 'react-dom';
import App from './app';
import './styles/main.scss'; // import main.scss to make dependency

render(
  <App />,
  document.getElementById('root')
);
