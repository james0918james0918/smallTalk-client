import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {render} from 'react-dom';
import App from './containers/app';
import "./style/main.scss";

render(
    <App />,
    document.getElementById('root')
)
