import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw';
import LastLocation from './classes/LastLocation';
import ErrorScreen from './components/ErrorScreen/ErrorScreen';
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

// Restore the last location
const somewhereInTaipei = [121.5313043, 25.0493621];
const lastLocation = LastLocation.restore();
const initialZoomLevel = lastLocation ? 14 : 9;

const App = () => {
    const history = useHistory();
    const goToHomepage = () => { history.push('/'); };

    const [mapCenter, setMapCenter] = useState(lastLocation || somewhereInTaipei);
    const [zoomLevel, setZoomLevel] = useState(initialZoomLevel);

    return (
        <>
            <Switch>
                <Route exact path="/places/:id">
                    <PlaceInfo setMapCenter={setMapCenter} setZoomLevel={setZoomLevel} />
                </Route>
                <Route exact path="/">
                    {null}
                </Route>
                <Route>
                    <ErrorScreen isCloseable onClick={goToHomepage} message="找不到網頁" />
                </Route>
            </Switch>
            <MaskMap
                mapCenter={mapCenter}
                setMapCenter={setMapCenter}
                setZoomLevel={setZoomLevel}
                zoomLevel={zoomLevel}
            />
        </>
    );
};

export default App;
