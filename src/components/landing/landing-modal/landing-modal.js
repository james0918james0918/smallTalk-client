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
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: null,
      },
      isLoading: false
    };

    this.toggle = this.toggle.bind(this);
    this.onTabClick = this.onTabClick.bind(this);
    this.onInputFieldsChange = this.onInputFieldsChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  // Get updates from the parent component
  componentDidUpdate(prevProps) {
    if (this.props.modal !== prevProps.modal) {
      this.setState({
        modal: this.props.modal
      })
    }

    if (this.props.activeTab !== prevProps.activeTab) {
      this.setState({
        activeTab: this.props.activeTab
      })
    }
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    this.props.onModalChange(!this.state.modal)
  }

  onTabClick(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  onInputFieldsChange(e) {
    // Use HTML's name property to identify the field changed
    const { formData } = this.state;
    formData[e.target.name] = e.target.value;
    this.setState({ formData });
  }

  submit() {
    if (this.state.activeTab === LOGIN_MODAL_TABS.SIGN_IN) {
      this.setState({ isLoading: true });
      authService.logIn(this.state.formData.username, this.state.formData.password)
        .then(() => {
          this.setState({ isLoading: false });
          this.props.history.push('/');
        });
    } else {
      userService.create({
        name: {
          firstName: this.state.formData.firstName,
          lastName: this.state.formData.lastName
        },
        username: this.state.formData.username,
        password: this.state.formData.password,
        email: this.state.formData.email
      }).then(() => this.props.history.push('/'));
    }
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalBody>
            <Nav tabs>
              <NavItem>
                <NavLink className={classnames({ active: this.state.activeTab === LOGIN_MODAL_TABS.SIGN_UP })}
                         onClick={() => { this.onTabClick(LOGIN_MODAL_TABS.SIGN_UP); }}>
                  <FontAwesomeIcon icon="user-plus" />{' '}Sign Up
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={classnames({ active: this.state.activeTab === LOGIN_MODAL_TABS.SIGN_IN })}
                         onClick={() => {this.onTabClick(LOGIN_MODAL_TABS.SIGN_IN); }}>
                  <FontAwesomeIcon icon="sign-in-alt" />{' '}Sign In
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane className="input-form" tabId={LOGIN_MODAL_TABS.SIGN_UP}>
                <SignUpForm onInputFieldsChange={this.onInputFieldsChange}
                            formStates={this.state.formData}
                />
              </TabPane>
              <TabPane className="input-form" tabId={LOGIN_MODAL_TABS.SIGN_IN}>
                <SignInForm onInputFieldsChange={this.onInputFieldsChange}
                            formData={this.state.formData}
                />
              </TabPane>
            </TabContent>
          </ModalBody>
          <ModalFooter>
            <LoaderButton color={!this.state.invalid ? 'primary' : 'light'}
                          disabled={this.state.invalid}
                          onClick={this.submit}
                          type="submit"
                          isLoading={this.state.isLoading}
                          text="Submit"
                          loadingText="Logging In" />
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default withRouter(LandingModal);
