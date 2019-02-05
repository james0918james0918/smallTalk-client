import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {render} from 'react-dom';
import App from './app';
import "./style/main.scss"; // import main.scss to make dependency

render(
    <App></App>,
    document.getElementById('root')
)
