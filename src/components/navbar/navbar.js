import React, { Component } from 'react';
import './navbar.css';

import {
    Collapse,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink } from 'reactstrap';
import LoginModal from '../login-modal/login-modal';
import { LOGIN_MODAL_TABS } from '../../constants/login';

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            modal: false,
            signUpOrSignIn: null
        };

        this.toggle = this.toggle.bind(this);
        this.onModalChange = this.onModalChange.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    onModalChange(modalState, signUpOrSignIn) {
        this.setState({
            modal: modalState,
            signUpOrSignIn: signUpOrSignIn
        });
    }

    render() {
        return (
            <div>
                <Navbar color="transparent" expand="md" id="navBar" fixed="top">
                    <NavbarBrand id="navBarBrand">SmallTalk</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} id="navBarToggler" />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" id="navBarNav" navbar>
                            <NavItem className="nav-bar-item">
                                <NavLink className="nav-bar-link"
                                         onClick={this.onModalChange.bind(this, true, LOGIN_MODAL_TABS.SIGN_UP)}>
                                    Sign Up
                                </NavLink>
                            </NavItem>
                            <NavItem className="nav-bar-item">
                                <NavLink className="nav-bar-link"
                                         onClick={this.onModalChange.bind(this, true, LOGIN_MODAL_TABS.SIGN_IN)}>
                                    Sign In
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <LoginModal modal={this.state.modal} activeTab={this.state.signUpOrSignIn} onModalChange={this.onModalChange}>
                </LoginModal>
            </div>
        )
    }
}

export default NavBar;
