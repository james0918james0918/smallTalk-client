import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './sign-in-form.css';

import {
    Form,
    FormGroup,
    Input,
    Label } from 'reactstrap';

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
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
        this.props.onInputFieldsChange(e);
    }

    render() {
        return (
            <Form id="signInForm">
                <FormGroup>
                    <Label for="usernameOrEmailInput" className="required">
                        <FontAwesomeIcon icon="user" />{' '}Username/Email
                    </Label>
                    <Input id="usernameOrEmailInput"
                           name="username"
                           placeholder="Username/Email"
                           onChange={this.props.onInputFieldsChange}
                           required></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="passwordInput" className="required">
                        <FontAwesomeIcon icon="key" />{' '}Password
                    </Label>
                    <Input id="passwordInput"
                           name="password"
                           placeholder="Password"
                           type="password"
                           onChange={this.props.onInputFieldsChange}></Input>
                </FormGroup>
            </Form>
        )
    }
}

export default SignInForm
