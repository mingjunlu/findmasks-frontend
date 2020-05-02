import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';
import LastLocation from './classes/LastLocation';
import usePageView from './hooks/usePageView';
import ErrorScreen from './components/ErrorScreen/ErrorScreen';
import PlaceInfo from './components/PlaceInfo/PlaceInfo';
import ResetTitle from './components/ResetTitle/ResetTitle';
import MaskMap from './components/MaskMap/MaskMap';

// Initialize Google Analytics
const isProduction = (process.env.NODE_ENV === 'production');
if (isProduction) {
    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
}

// Restore the last location
const somewhereInTaipei = [121.5313043, 25.0493621];
const lastLocation = LastLocation.restore();
const initialZoomLevel = lastLocation ? 14 : 9;

const App = () => {
    const history = useHistory();
    const goToHomepage = () => { history.push('/'); };

    const [mapCenter, setMapCenter] = useState(lastLocation || somewhereInTaipei);
    const [zoomLevel, setZoomLevel] = useState(initialZoomLevel);

    usePageView(); // Track the pageview

    return (
        <>
            <Switch>
                <Route exact path="/places/:id">
                    <PlaceInfo setMapCenter={setMapCenter} setZoomLevel={setZoomLevel} />
                </Route>
                <Route exact path="/">
                    <ResetTitle />
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
