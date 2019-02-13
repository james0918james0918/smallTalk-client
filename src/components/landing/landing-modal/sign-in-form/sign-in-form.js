import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './sign-in-form.scss';

import {
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap';

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.formData.username,
      password: this.props.formData.password,
      formValidBits:{
        username: false,
        password: false,
      }
    };

    this.onInputFieldsChange = this.onInputFieldsChange.bind(this);
    this.changeFieldValid = this.changeFieldValid.bind(this);
  }

  changeFieldValid(e) { 
    const { formValidBits } = this.state;
    // username and password should not be empty
    if (e.target.value.length > 0) {
      formValidBits[e.target.name] = true;
      // update the formdata
      this.props.onInputFieldsChange('signinFormData', e.target.name, e.target.value);
    } else {
      formValidBits[e.target.name] = false;
      // update the formdata
      this.props.onInputFieldsChange('signinFormData', e.target.name, null);
    }
    this.setState({ formValidBits });
  }

  onInputFieldsChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    // change the valid bits
    this.changeFieldValid(e);
  }

  render() {
    return (
      <Form id="signInForm">
        <FormGroup>
          <Label for="signInUsernameInput" className="required">
            <FontAwesomeIcon icon="user" />{' '}Username/Email
          </Label>
          <Input id="signInUsernameInput"
                 name="username"
                 placeholder="Username/Email"
                 onChange={this.onInputFieldsChange}
                 required
          />
        </FormGroup>
        <FormGroup>
          <Label for="signInPasswordInput" className="required">
            <FontAwesomeIcon icon="key" />{' '}Password
          </Label>
          <Input id="signInPasswordInput"
                 name="password"
                 placeholder="Password"
                 type="password"
                 onChange={this.onInputFieldsChange}
          />
        </FormGroup>
      </Form>
    );
  }
}

export default SignInForm;
