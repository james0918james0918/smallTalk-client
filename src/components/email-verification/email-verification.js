import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { SpinnerContext } from '../../services/spinner-service';
import { UserService } from '../../services/user-service';
import './email-verification.scss';

const userService = new UserService();
export default class EmailVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProcessing: true,
      validated: false
    };
  }

  componentDidMount() {
    const { toggleSpinner } = this.context;
    (async () => {
      try {
        const res = await userService.validateEmail(this.props.match.params.token);
        if (res.status === 200) {
          this.setState({ isProcessing: false, validated: true });
        } else {
          this.setState({ isProcessing: false, validated: false });
        }
        toggleSpinner();
      } catch (err) {
        console.log(err);
      }
    })();
  }

  render() {
    let element = null;
    if (this.state.isProcessing) element = <div className="email-verification"> Validating, please wait a second... </div>;
    else {
      element = this.state.validated ? <Redirect to="/" /> : <Redirect to="/landing" />;
    }
    return (
      <Route path={`${this.props.match.url}/:token`} Component={element} />
    );
  }
}

EmailVerification.contextType = SpinnerContext;
