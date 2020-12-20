import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ReactGA from 'react-ga';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw';
import 'normalize.css/normalize.css';
import './assets/stylesheets/reset.css';
import './assets/stylesheets/index.css';
import App from './App';

// Redirect to the custom domain
const shouldRedirect = window.location.host.includes('findmasks.netlify.app');
if (shouldRedirect) {
    window.location.replace(`https://www.findmasks.tw${window.location.pathname}`);
}

// Initialize Google Analytics
const isProduction = (process.env.NODE_ENV === 'production');
if (isProduction) {
    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
}

// Change locale globally
dayjs.locale('zh-tw');

ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('root'));
