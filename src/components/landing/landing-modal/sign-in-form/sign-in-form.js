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
      password: this.props.formData.password
    };

    this.onInputFieldsChange.bind(this);
  }

  onInputFieldsChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    this.props.onInputFieldsChange(e);
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
                 onChange={this.props.onInputFieldsChange}
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
                 onChange={this.props.onInputFieldsChange}
          />
        </FormGroup>
      </Form>
    );
  }
}

export default SignInForm;
