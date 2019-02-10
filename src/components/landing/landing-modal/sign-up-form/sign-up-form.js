import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LOGIN_MODAL_TABS } from '../../../../constants/login';
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
      formData: this.props.formData,
      formValidBits: {
        firstName: false,
        lastName: false,
        email: false,
        username: false,
        password: false,
        confirmPassword: false,
        gender: false
      },
      formFirstBits:{
        firstName: true,
        lastName: true,
        email: true,
        username: true,
        password: true,
        confirmPassword: true
      }
    };

    this.handleNormalOnChange = this.handleNormalOnChange.bind(this);
    this.handlePasswordOnChange = this.handlePasswordOnChange.bind(this);
    this.handleGenderOnChange = this.handleGenderOnChange.bind(this);
    this.changeState = this.changeState.bind(this);
    this.changeFieldsValid = this.changeFieldsValid.bind(this);
    this.accountValidation = this.accountValidation.bind(this);
  }

  // Get updates from the parent component
  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.formData, prevProps.formData)) {
      this.setState({
        formData: this.props.formData
      });
    }
  }

  changeState(e) {
    const { formData } = this.state;
    formData[e.target.name] = e.target.value;
    this.setState({ formData });
  }

  // Change the valid bit according to the validation and set the first bit to true
  changeFieldsValid(e, isValidOrNot) {
    const { formValidBits, formFirstBits } = this.state;
    // not first time
    if (formFirstBits[e.target.name]) formFirstBits[e.target.name] = false;
    formValidBits[e.target.name] = isValidOrNot;
    this.setState({ formValidBits, formFirstBits });
  }

  accountValidation(e, minLength) {
    const validReg = /\S*[A-Z]\S*[A-Z]\S*/;
    if (e.target.value.length > minLength && validReg.test(e.target.value)) {
      this.changeFieldsValid(e,true);
      this.props.onInputFieldsChange('formData',e.target.name, e.target.value);
    } else {
      this.changeFieldsValid(e,false);
      this.props.onInputFieldsChange('formData',e.target.name, null);
    }
  }

  handleNormalOnChange(e) {
    this.changeState(e); // Change the local state of the form
    if (e.target.name === 'firstName' || e.target.name === 'lastName') {
      // The only constraint of name fields is not being empty
      if (e.target.name.length > 0) {
        this.changeFieldsValid(e, true);
        // Update the parent component when input is valid
        this.props.onInputFieldsChange('formData',e.target.name, e.target.value);
      } else {
        this.changeFieldsValid(e, false);
        this.props.onInputFieldsChange('formData',e.target.name, null);
      }
    } else if (e.target.name === 'email') {
      const emailReg = /^\S+@\S+\.\S+$/;
      if (emailReg.test(e.target.value)) {
        this.changeFieldsValid(e, true);
        this.props.onInputFieldsChange('formData',e.target.name, e.target.value);
      } else {
        this.changeFieldsValid(e, false);
        this.props.onInputFieldsChange('formData',e.target.name, null);
      }
    } else if (e.target.name === 'username') {
      // for account
      // length > 6 && at least two capital letters
      this.accountValidation(e, 6);
      this.props.onInputFieldsChange('formData',e.target.name, e.target.value);
    }
  }

  handlePasswordOnChange(e) {
    this.changeState(e); // Change the local state of the form
    if (e.target.name === 'password') {
      // at least one capital letter and one symbol
      const passwordReg1 = /\S*[A-Z]\S*\W+\S*/;
      const passwordReg2 = /\S*\W+\S*[A-Z]\S*/;
      if ((passwordReg1.test(e.target.value) || passwordReg2.test(e.target.value))
        && this.state.formData[e.target.name].length > 7) {
        this.changeFieldsValid(e, true);
        this.props.onInputFieldsChange('formData',e.target.name, e.target.value);
      } else {
        this.changeFieldsValid(e, false);
        this.props.onInputFieldsChange('formData',e.target.name, null);
      }
    } else if (e.target.value === this.state.formData.password) {
      this.changeFieldsValid(e, true);
      this.props.onInputFieldsChange('formData',e.target.name, e.target.value);
    } else {
      this.changeFieldsValid(e, false);
      this.props.onInputFieldsChange('formData',e.target.name, null);
    }
  }

  handleGenderOnChange(e) {
    this.changeState(e); // Change the local state of the form
    this.props.onInputFieldsChange('formData',e.target.name, e.target.value);
    this.changeFieldsValid(e, true); // simply change the gender bit to true
  }

  render() {
    return (
      <Form id="signUpForm">
        <FormGroup>
          <Label for="FullNameInput" className="required">
            <FontAwesomeIcon icon="file-signature" />{' '}Full Name
          </Label>
          <InputGroup id="fullNameInput">
            <Input name="firstName" id="firstNameInput" placeholder="First Name" inline="true"
                   valid={this.state.formValidBits.firstName}
                   invalid={!this.state.formValidBits.firstName && !this.state.formFirstBits.firstName}
                   onChange={this.handleNormalOnChange} />
            <Input name="lastName" id="lastNameInput" placeholder="Last Name" inline="true"
                   valid={this.state.formValidBits.lastName}
                   invalid={!this.state.formValidBits.lastName && !this.state.formFirstBits.lastName}
                   onChange={this.handleNormalOnChange} />
            <FormFeedback>Both name fields should be filled.</FormFeedback>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for="emailInput" className="required">
            <FontAwesomeIcon icon="envelope" />{' '}Email
          </Label>
          <Input name="email" id="emailInput" className="normalInput" placeholder="test@example.com" type="email"
                 valid={this.state.formValidBits.email}
                 invalid={!this.state.formValidBits.email && !this.state.formFirstBits.email}
                 onChange={this.handleNormalOnChange} />
          <FormFeedback>Please enter a valid email!</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="usernameInput" className="required">
            <FontAwesomeIcon icon="user" />{' '}Username
          </Label>
          <Input name="username" id="usernameInput" placeholder="Username"
                 valid={this.state.formValidBits.username}
                 invalid={!this.state.formValidBits.username && !this.state.formFirstBits.username}
                 onChange={this.handleNormalOnChange} />
          <FormFeedback>Username must contain at least 6 letters, includeing two capital letters.</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="passwordInput" className="required">
            <FontAwesomeIcon icon="key" />{' '}Password
          </Label>
          <Input name="password" id="passwordInput" placeholder="Password" type="password"
                 valid={this.state.formValidBits.password}
                 invalid={!this.state.formValidBits.password && !this.state.formFirstBits.password}
                 onChange={this.handlePasswordOnChange} />
          <FormFeedback>Password must contain at least 7 letters, including one capital letter and one symbol.</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="confirmPasswordInput" className="required">
            <FontAwesomeIcon icon="redo" />{' '}Confirm Password
          </Label>
          <Input name="confirmPassword" id="confirmPasswordInput" placeholder="Password" type="password"
                 valid={this.state.formValidBits.confirmPassword}
                 invalid={!this.state.formValidBits.confirmPassword && !this.state.formFirstBits.confirmPassword}
                 onChange={this.handlePasswordOnChange} />
          <FormFeedback>Passwords must match!</FormFeedback>
        </FormGroup>
        <FormGroup tag="fieldset">
          <Label className="required">
            <FontAwesomeIcon icon="mars" />{' '}
            <FontAwesomeIcon icon="venus" />{' '}Gender
          </Label>
          <FormGroup check className="gender-choice">
            <Label check>
              <Input type="radio" name="gender" value="male" onChange={this.handleGenderOnChange} />
              {' '}Male
            </Label>
          </FormGroup>
          <FormGroup check className="gender-choice">
            <Label check>
              <Input type="radio" name="gender" value="female" onChange={this.handleGenderOnChange} />
              {' '}Female
            </Label>
          </FormGroup>
          <FormGroup check className="gender-choice">
            <Label check>
              <Input type="radio" name="gender" value="unidentified" onChange={this.handleGenderOnChange} />
              {' '}Don&#39;t want to identify
            </Label>
          </FormGroup>
        </FormGroup>
      </Form>
    );
  }
}

export default SignUpForm;
