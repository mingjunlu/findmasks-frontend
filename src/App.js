import React, { useEffect, useState } from 'react';
import {
    Route,
    Switch,
    useHistory,
    useLocation,
} from 'react-router-dom';
import ReactGA from 'react-ga';
import LastLocation from './classes/LastLocation';
import ErrorScreen from './components/ErrorScreen/ErrorScreen';
import PlaceInfo from './components/PlaceInfo/PlaceInfo';
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
    const {
        pathname,
        search,
        hash,
        state: locationState,
    } = useLocation();

    // Track pageviews
    useEffect(() => {
        if (!isProduction) { return; }
        const hasPlaceName = (locationState && locationState.placeName);
        const page = `${pathname}${search}${hash}`;
        const title = hasPlaceName ? `${locationState.placeName} | 口罩咧？` : document.title;
        ReactGA.pageview(page, undefined, title);
    }, [hash, locationState, pathname, search]);

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
