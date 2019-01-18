import React, { Component } from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import UserService from '../../services/user-service';

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
    TabPane } from 'reactstrap';

import { LOGIN_MODAL_TABS } from '../../constants/login';
import LoaderButton from '../../common/loader-button/loader-button';
import './login-modal.css';

let userService = new UserService();

class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: this.props.modal,
            activeTab: this.props.activeTab,
            invalid: true,
            formStates: {
                firstName: null,
                lastName: null,
                email: null,
                username: null,
                password: null,
                confirmPassword: null,
                gender: null,
            },
        }

        this.toggle = this.toggle.bind(this);
        this.onTabClick = this.onTabClick.bind(this);
        this.onInputFieldsChange = this.onInputFieldsChange.bind(this);
        this.formEnable=this.formEnable.bind(this);
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

    formEnable(formValidBits){
        // check if all bits are set
        this.setState({ invalid: !Object.keys(formValidBits).every((bit)=> formValidBits[bit]) });
    }

    // Getting the form data
    // only valid form data or null is given
    onInputFieldsChange(fieldName,value) {
        // Use HTML's name property to identify the field changed
        const { formStates } = this.state
        formStates[fieldName] = value;
        this.setState({ formStates });
        console.log(`the state in parent: ${this.state.formStates[fieldName]}`);
    }

    submit() {
        if (this.state.activeTab === LOGIN_MODAL_TABS.SIGN_IN) {

        } else {

            //send the request to the server to ask the server to send the email
            (async function(userInfo){
                try{
                    let res=await userService.sendEmail( userInfo );
                    console.log(res);
                }catch(e){
                    console.log(`error: ${e}`);
                }
            })(this.state.formStates);
        
            // create database connection
            userService.create({
                name: {
                    firstName: this.state.formStates.firstName,
                    lastName: this.state.formStates.lastName
                },
                username: this.state.formStates.username,
                password: this.state.formStates.password,
                email: this.state.formStates.email,
                gender: this.state.formStates.gender,
            }).then(() => console.log("Yee"));
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
                                         onClick={() => { this.onTabClick(LOGIN_MODAL_TABS.SIGN_UP) }}>
                                    <FontAwesomeIcon icon="user-plus"></FontAwesomeIcon>{' '}Sign Up
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={classnames({ active: this.state.activeTab === LOGIN_MODAL_TABS.SIGN_IN })}
                                         onClick={() => { this.onTabClick(LOGIN_MODAL_TABS.SIGN_IN) }}>
                                         <FontAwesomeIcon icon="sign-in-alt"></FontAwesomeIcon>{' '}Sign In
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane className="input-form" tabId={LOGIN_MODAL_TABS.SIGN_UP}>
                                <SignUpForm onInputFieldsChange={ this.onInputFieldsChange }
                                            formEnable={ this.formEnable }
                                            formStates={ this.state.formStates }/>
                            </TabPane>
                            <TabPane className="input-form" tabId={LOGIN_MODAL_TABS.SIGN_IN}>
                                <SignInForm onInputFieldsChange={ this.onInputFieldsChange } />
                            </TabPane>
                        </TabContent>
                    </ModalBody>
                    <ModalFooter>
                        <LoaderButton color={ !this.state.invalid ? "primary" : "light" }
                                      disabled={this.state.invalid}
                                      onClick={this.submit}
                                      type="submit"
                                      isLoading={false}
                                      text="Submit"
                                      loadingText="Logging In" />
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default LoginModal;
