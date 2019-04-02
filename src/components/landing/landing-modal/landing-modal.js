import React, { Component } from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';

import { AuthService, UserService } from '../../../services/index';

import SignInForm from './sign-in-form/sign-in-form';
import SignUpForm from './sign-up-form/sign-up-form';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';

import { LOGIN_MODAL_TABS } from '../../../constants/login';
import LoaderButton from '../../../common/loader-button/loader-button';
import './landing-modal.scss';

const userService = new UserService();
const authService = new AuthService();

class LandingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modal,
      activeTab: this.props.activeTab,
      invalid: true,
      formData: {
        firstName: null,
        lastName: null,
        email: null,
        username: null,
        password: null,
        confirmPassword: null,
        gender: null
      },
      signinFormData: {
        username: null,
        password: null
      },
      isLoading: false
    };

    this.toggle = this.toggle.bind(this);
    this.onTabClick = this.onTabClick.bind(this);
    this.onInputFieldsChange = this.onInputFieldsChange.bind(this);
    this.formEnable = this.formEnable.bind(this);
    this.submit = this.submit.bind(this);
  }

  // Get updates from the parent component
  componentDidUpdate(prevProps) {
    if (this.props.modal !== prevProps.modal) {
      this.setState({
        modal: this.props.modal
      });
    }

    if (this.props.activeTab !== prevProps.activeTab) {
      this.setState({
        activeTab: this.props.activeTab
      });
    }
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    this.props.onModalChange(!this.state.modal);
  }

  onTabClick(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
      // perform a re-check when switching between tabs
      // in order to determine whether the submit btn can be enabled or not
      if (tab === LOGIN_MODAL_TABS.SIGN_UP) this.formEnable('formData');
      else this.formEnable('signinFormData');
    }
  }

  formEnable(tab) {
    // check if all fields are not null
    this.setState({
      invalid: !Object.keys(this.state[tab]).every(
        field => this.state[tab][field]
      )
    });
  }

  onInputFieldsChange(whichForm, fieldName, value) {
    // Use HTML's name property to identify the field changed
    if (whichForm === 'formData') {
      const formData = { ...this.state.formData }; // can be better?
      formData[fieldName] = value;
      // setState is async
      // so invalid must be checked inside the callback function of setState
      // guarantee to get updated state
      this.setState({ formData }, this.formEnable.bind(this, whichForm));
    } else {
      const signinFormData = { ...this.state.signinFormData };
      signinFormData[fieldName] = value;
      this.setState({ signinFormData }, this.formEnable.bind(this, whichForm));
    }
  }

  submit() {
    if (this.state.activeTab === LOGIN_MODAL_TABS.SIGN_IN) {
      this.setState({ isLoading: true });
      (async () => {
        try {
          const { username, password } = this.state.signinFormData;
          const res = await authService
            .logIn(username, password);
          // set the token
          localStorage.setItem('user', JSON.stringify(res.data.user));
          this.setState({ isLoading: false });
          this.props.history.push(`/home/${res.data.id}`, { id: res.data.id });
        } catch (e) {
          // e
        }
      })();
    } else {
      // send the request to the server to ask the server to send the email
      (async (userInfo) => {
        try {
          let res = await userService.sendEmail(userInfo);
          console.log(res);
        } catch (e) {
          console.log(e);
        }
      })(this.state.formData);

      userService
        .create({
          name: {
            firstName: this.state.formData.firstName,
            lastName: this.state.formData.lastName
          },
          username: this.state.formData.username,
          password: this.state.formData.password,
          gender: this.state.formData.gender,
          email: this.state.formData.email
        })
        .then(() => this.props.history.push('/landing'));
    }
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalBody>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === LOGIN_MODAL_TABS.SIGN_UP
                  })}
                  onClick={() => {
                    this.onTabClick(LOGIN_MODAL_TABS.SIGN_UP);
                  }}
                >
                  <FontAwesomeIcon icon="user-plus" /> Sign Up
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === LOGIN_MODAL_TABS.SIGN_IN
                  })}
                  onClick={() => {
                    this.onTabClick(LOGIN_MODAL_TABS.SIGN_IN);
                  }}
                >
                  <FontAwesomeIcon icon="sign-in-alt" /> Sign In
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane className="input-form" tabId={LOGIN_MODAL_TABS.SIGN_UP}>
                <SignUpForm
                  onInputFieldsChange={this.onInputFieldsChange}
                  formData={this.state.formData}
                />
              </TabPane>
              <TabPane className="input-form" tabId={LOGIN_MODAL_TABS.SIGN_IN}>
                <SignInForm
                  onInputFieldsChange={this.onInputFieldsChange}
                  formData={this.state.formData}
                />
              </TabPane>
            </TabContent>
          </ModalBody>
          <ModalFooter>
            <LoaderButton
              color={!this.state.invalid ? 'primary' : 'light'}
              disabled={this.state.invalid}
              onClick={this.submit}
              type="submit"
              isLoading={this.state.isLoading}
              text="Submit"
              loadingText="Logging In"
            />
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default withRouter(LandingModal);
