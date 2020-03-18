import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw';
import 'normalize.css/normalize.css';
import './reset.css';
import './index.css';
import App from './App';

// Initialize Google Analytics
const isProduction = (process.env.NODE_ENV === 'production');
if (isProduction) {
    const path = `${window.location.pathname}${window.location.search}`;
    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
    ReactGA.pageview(path);
}

// Change locale globally
dayjs.locale('zh-tw');

ReactDOM.render(<App />, document.getElementById('root'));
