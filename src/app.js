import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import Routes from './routes';
import NavBar from './components/navbar/navbar';

import addFontAwesomeIcons from './common/font-awesome-icons/font-awesome-icons';

addFontAwesomeIcons();

class App extends Component {
    render() {
        return (
            <div className="app">
                <NavBar />
                <Router>
                    <Routes />
                </Router>
            </div>
        )
    }
}

export default App;
