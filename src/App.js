import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import LastLocation from './classes/LastLocation';
import usePageView from './hooks/usePageView';
import fetchData from './utilities/fetchData';
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
    usePageView(); // Track the pageview

    const history = useHistory();
    const goToHomepage = () => { history.push('/'); };

    const [mapCenter, setMapCenter] = useState(lastLocation || somewhereInTaipei);
    const [zoomLevel, setZoomLevel] = useState(initialZoomLevel);
    const [userPosition, setUserPosition] = useState({
        coordinates: [],
        radius: 0,
    });

    const [features, setFeatures] = useState([]);
    useEffect(() => {
        let isMounted = true;
        const getFeatureCollection = async () => {
            const collection = await fetchData(process.env.REACT_APP_ENDPOINT);
            if (isMounted) {
                const featuresToSet = (collection instanceof Error)
                    ? collection
                    : collection.features;
                setFeatures(featuresToSet);
            }
        };
        getFeatureCollection();
        return () => { isMounted = false; }; // Prevent setting state after unmounted
    }, []);

    const hasError = (features instanceof Error);
    if (hasError) { return <ErrorScreen message="無法取得資料" />; }

    const hasData = (features.length > 0);
    const sortedMaskNumbers = hasData
        ? features
            .map((feature) => feature.properties.masksLeft)
            .sort((a, b) => (a - b))
        : [];
    const sortedChildMaskNumbers = hasData
        ? features
            .map((feature) => feature.properties.childMasksLeft)
            .sort((a, b) => (a - b))
        : [];

    return (
        <>
            <MaskMap
                mapCenter={mapCenter}
                setMapCenter={setMapCenter}
                setZoomLevel={setZoomLevel}
                zoomLevel={zoomLevel}
                userPosition={userPosition}
                features={features}
                sortedMaskNumbers={sortedMaskNumbers}
            />
            {hasData && (
                <MapControls
                    setMapCenter={setMapCenter}
                    setUserPosition={setUserPosition}
                    setZoomLevel={setZoomLevel}
                />
            )}
            <Switch>
                <Route exact path="/places/:id">
                    {hasData && (
                        <PlaceInfo
                            setMapCenter={setMapCenter}
                            setZoomLevel={setZoomLevel}
                            sortedMaskNumbers={sortedMaskNumbers}
                            sortedChildMaskNumbers={sortedChildMaskNumbers}
                        />
                    )}
                </Route>

                <Route exact path="/">
                    <ResetTitle />
                </Route>

                <Route>
                    <ErrorScreen
                        isCloseable
                        onClick={goToHomepage}
                        message="找不到網頁"
                    />
                </Route>
            </Switch>
        </>
    );
};

export default App;
