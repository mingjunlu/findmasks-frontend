import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw';
import PlaceInfo from './components/PlaceInfo/PlaceInfo';
import MaskMap from './components/MaskMap/MaskMap';

// Initialize Google Analytics
const isProduction = (process.env.NODE_ENV === 'production');
if (isProduction) {
    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
    ReactGA.pageview(`${window.location.pathname}${window.location.search}`);
}

// Change locale globally
dayjs.locale('zh-tw');

// Clear old values from localStorage
localStorage.removeItem('agreement');
localStorage.removeItem('lastKnownLocation');

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/places/:id">
                <PlaceInfo />
            </Route>
        </Switch>
        <MaskMap />
    </BrowserRouter>
);

export default App;
