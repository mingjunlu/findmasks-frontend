import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw';
import 'normalize.css/normalize.css';
import './assets/stylesheets/reset.css';
import './assets/stylesheets/index.css';
import App from './App';

// Change locale globally
dayjs.locale('zh-tw');

ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('root'));
