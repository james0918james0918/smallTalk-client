import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import NavBar from './components/nav-bar/nav-bar';
import { SpinnerContext } from './services/index';
import { Spinner } from './common/spinner/spinner';
import addFontAwesomeIcons from './common/font-awesome-icons/font-awesome-icons';
import './styles/layout/reset.scss'; // reset the font to 10px

addFontAwesomeIcons();

export default class App extends Component {
  constructor(props) {
    super(props);
    
    // these two are for spinner context
    this.toggleSpinner = () => {
      this.setState(state => ({
        isSpinnerLoading: !state.isSpinnerLoading
      }), () => { console.log(`spinner now will be ${this.state.isSpinnerLoading}`); });
    };

    this.state = {
      isSpinnerLoading: false,
      toggleSpinner: this.toggleSpinner
    };
  }

  render() {
    const showNavBar = localStorage.getItem('user') ? <NavBar /> : '';
    return (
      <div className="app">
        {showNavBar}
        <SpinnerContext.Provider value={this.state}>
          <Spinner />
          <Router>
            <Routes />
          </Router>
        </SpinnerContext.Provider>
      </div>
    );
  }
}
