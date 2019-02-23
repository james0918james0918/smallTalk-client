import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { SpinnerContext, UserService } from '../../services/index';
import './email-verification.scss';


const userService = new UserService();
class EmailVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProcessing: true,
      validated: false
    };
  }

  componentDidMount() {
    const { toggleSpinner } = this.context;
    toggleSpinner();
    (async () => {
      try {
        await userService.validateEmail(this.props.match.params.token);
        // doesn't return anything, the promise returned by then
        // gets resolved with an undefined value
        // so res is undefined right here
        this.setState({ isProcessing: false, validated: true }, toggleSpinner);
      } catch (err) {
        // enter catch block if res.status !== 200
        // if(err.response): The request was made and the server responded with a status code
        // which falls out of the range of 2xx
        // if(err.request): request is made but no response is recieved
        this.setState({ isProcessing: false, validated: false }, toggleSpinner);
      }
    })();
  }

  render() {
    let element = null;
    if (this.state.isProcessing) element = <div className="email-verification__text"> Validating, please wait a second... </div>;
    else {
      element = this.state.validated ? <Redirect to="/" /> : <Redirect to="/landing" />;
    }
    return element;
  }
}
EmailVerification.contextType = SpinnerContext;

export default ({ match }) => (
  <div className="email-verification">
    <Route path={`${match.path}/:token`} component={EmailVerification} />
  </div>
);
