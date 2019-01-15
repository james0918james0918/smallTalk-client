import React, { Component } from 'react'
import NavBar from '../components/navbar/navbar'
import Landing from '../components/landing/landing'
import Cards from '../'
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faEnvelope,
    faFileSignature,
    faKey,
    faMars,
    faRedo,
    faSignInAlt,
    faSpinner,
    faUser,
    faUserPlus,
    faVenus } from '@fortawesome/free-solid-svg-icons';

library.add(
    faEnvelope,
    faFileSignature,
    faKey,
    faMars,
    faRedo,
    faSignInAlt,
    faSpinner,
    faUser,
    faUserPlus,
    faVenus
)

class App extends Component {
    render() {
        return (
            <div className="app">
                <NavBar />
                <Landing />
            </div>
        )
    }
}

export default App;
