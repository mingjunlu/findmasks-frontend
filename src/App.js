import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import LastLocation from './classes/LastLocation';
import usePageView from './hooks/usePageView';
import ErrorScreen from './components/ErrorScreen/ErrorScreen';
import PlaceInfo from './components/PlaceInfo/PlaceInfo';
import ResetTitle from './components/ResetTitle/ResetTitle';
import MapControls from './components/MapControls/MapControls';
import MaskMap from './components/MaskMap/MaskMap';

// Restore the last location
const somewhereInTaipei = [121.5313043, 25.0493621];
const lastLocation = LastLocation.restore();
const initialZoomLevel = lastLocation ? 14 : 9;

const App = () => {
    const history = useHistory();
    const goToHomepage = () => { history.push('/'); };

    const [mapCenter, setMapCenter] = useState(lastLocation || somewhereInTaipei);
    const [zoomLevel, setZoomLevel] = useState(initialZoomLevel);
    const [userPosition, setUserPosition] = useState({
        coordinates: [],
        radius: 0,
    });

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
            <MapControls
                setMapCenter={setMapCenter}
                setUserPosition={setUserPosition}
                setZoomLevel={setZoomLevel}
            />
            <MaskMap
                mapCenter={mapCenter}
                setMapCenter={setMapCenter}
                setZoomLevel={setZoomLevel}
                zoomLevel={zoomLevel}
                userPosition={userPosition}
            />
        </>
    );
};

export default App;
