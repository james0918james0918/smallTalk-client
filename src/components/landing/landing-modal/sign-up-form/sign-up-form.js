import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';

import {
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  Label
} from 'reactstrap';

import './sign-up-form.scss';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formStates: this.props.formStates,
    }
  }

  // Get updates from the parent component
  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.formStates, prevProps.formStates)) {
      this.setState({
        formStates: this.props.formStates
      })
    }
  }

  render() {
    return (
      <Form id="signUpForm">
        <FormGroup>
          <Label for="FullNameInput" className="required">
            <FontAwesomeIcon icon="file-signature" />{' '}Full Name
          </Label>
          <InputGroup id="fullNameInput">
            <Input id="firstNameInput" placeholder="First Name" inline="true" />
            <Input id="lastNameInput" placeholder="Last Name" inline="true" />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for="emailInput" className="required">
            <FontAwesomeIcon icon="envelope" />{' '}Email
          </Label>
          <Input id="emailInput" placeholder="test@example.com" />
          <FormFeedback>Please enter a valid email!</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="usernameInput" className="required">
            <FontAwesomeIcon icon="user" />{' '}Username
          </Label>
          <Input id="usernameInput" placeholder="Username" />
        </FormGroup>
        <FormGroup>
          <Label for="passwordInput" className="required">
            <FontAwesomeIcon icon="key" />{' '}Password
          </Label>
          <Input id="passwordInput" placeholder="Password" type="password" />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPasswordInput" className="required">
            <FontAwesomeIcon icon="redo" />{' '}Confirm Password
          </Label>
          <Input invalid id="confirmPasswordInput" placeholder="Password" type="password" />
          <FormFeedback>Passwords must match!</FormFeedback>
        </FormGroup>
        <FormGroup tag="fieldset">
          <Label className="required">
            <FontAwesomeIcon icon="mars" />{' '}
            <FontAwesomeIcon icon="venus" />{' '}Gender
          </Label>
          <FormGroup check className="gender-choice">
            <Label check>
              <Input type="radio" name="radio1" />
              {' '}Male
            </Label>
          </FormGroup>
          <FormGroup check className="gender-choice">
            <Label check>
              <Input type="radio" name="radio1" />
              {' '}Female
            </Label>
          </FormGroup>
          <FormGroup check className="gender-choice">
            <Label check>
              <Input type="radio" name="radio1" />
              {' '}Don&#39;t want to identify
            </Label>
          </FormGroup>
        </FormGroup>
      </Form>
    )
  }
}

export default SignUpForm;
