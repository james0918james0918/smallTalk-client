import React, { Component } from 'react';
import LandingInfoCards from './landing-info-cards/landing-info-cards';
import LandingModal from './landing-modal/landing-modal';
import { INTRO_CONTENTS, LOGIN_MODAL_TABS } from '../../constants/index';
import './landing.scss';

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      modal: false,
      signUpOrSignIn: null
    };

    this.toggle = this.toggle.bind(this);
    this.onModalChange = this.onModalChange.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onModalChange(modalState, signUpOrSignIn) {
    this.setState({
      modal: modalState,
      signUpOrSignIn
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="masthead">
          <div className="landing-header">
            <span className="landing-brand">SmallTalk</span>
            <div className="landing-tool-box">
              <button className="landing-tool-box-item" type="button"
                      onClick={this.onModalChange.bind(this, true, LOGIN_MODAL_TABS.SIGN_UP)}>
                      Sign Up
              </button>
              <button className="landing-tool-box-item" type="button"
                      onClick={this.onModalChange.bind(this, true, LOGIN_MODAL_TABS.SIGN_IN)}>
                      Sign In
              </button>
            </div>
          </div>
          <LandingModal modal={this.state.modal}
                        activeTab={this.state.signUpOrSignIn}
                        onModalChange={this.onModalChange} />
          <div className="container d-flex h-100 align-items-center">
            <div className="mx-auto text-center">
              <h1 className="mx-auto my-0 text-uppercase">SmallTalk</h1>
              <h2 className="text-white-50 mx-auto mt-2 mb-5">Manage Team Like a Country</h2>
            </div>
          </div>
        </div>
        <LandingInfoCards headerText="Why smallTalk?" textGroup={INTRO_CONTENTS} />
      </React.Fragment>
    );
  }
}

export default Landing;
