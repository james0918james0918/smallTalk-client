import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import Routes from '../routes';
import NavBar from '../components/navbar/navbar';
import Landing from '../components/landing/landing';

import addFontAwesomeIcons from '../common/font-awesome-icons/font-awesome-icons';

addFontAwesomeIcons();

class App extends Component {
    render() {
        return (
            <div className="app">
                <NavBar />
                <Landing />
                <Router>
                    <div>
                        <Routes></Routes>
                    </div>
                </Router>
            </div>
        )
    }
}

export default App;
