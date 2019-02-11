import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import NavBar from './components/nav-bar/nav-bar';
import addFontAwesomeIcons from './common/font-awesome-icons/font-awesome-icons';
import './styles/layout/reset.scss'; // reset the font to 10px

addFontAwesomeIcons();

export default () => {
  const showNavBar = localStorage.getItem('user') ? <NavBar /> : '';
  return (
    <div className="app">
      {showNavBar}
      <Router>
        <Routes />
      </Router>
    </div>
  );
};
