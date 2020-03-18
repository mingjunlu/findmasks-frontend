import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Source } from 'react-mapbox-gl';
import ErrorScreen from '../ErrorScreen/ErrorScreen';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import MapControls from '../MapControls/MapControls';
import ClusterLayer from '../ClusterLayer/ClusterLayer';
import SymbolLayer from '../SymbolLayer/SymbolLayer';
import sourceProps from './sourceProps';

const MapLayers = (props) => {
    const {
        setIsSheetVisible,
        setMapCenter,
        setSelectedPlace,
        setZoomLevel,
    } = props;

    const [features, setFeatures] = useState([]);

    useEffect(() => {
        let isMounted = true;

        const getFeatureCollection = async () => {
            let fetchedData;
            try {
                const response = await fetch(process.env.REACT_APP_ENDPOINT);
                if (!response.ok) {
                    const { status, statusText } = response;
                    throw new Error(`${status} ${statusText}`);
                }
                const collection = await response.json();
                fetchedData = collection.features;
            } catch (error) {
                fetchedData = error;
            }
            if (isMounted && fetchedData) {
                setFeatures(fetchedData);
            }
        };
        getFeatureCollection();

        // Prevent setting state after unmounted
        return () => { isMounted = false; };
    }, []);

    const hasError = (features instanceof Error);
    if (hasError) { return <ErrorScreen message="無法取得資料" />; }

    const hasData = (features.length > 0);
    if (!hasData) { return <LoadingScreen />; }

    return (
        <>
            <MapControls
                setIsSheetVisible={setIsSheetVisible}
                setMapCenter={setMapCenter}
                setZoomLevel={setZoomLevel}
            />
            <Source
                id="places"
                geoJsonSource={{
                    ...sourceProps,
                    data: { type: 'FeatureCollection', features },
                }}
            />
            <ClusterLayer setMapCenter={setMapCenter} setZoomLevel={setZoomLevel} />
            <SymbolLayer
                setIsSheetVisible={setIsSheetVisible}
                setSelectedPlace={setSelectedPlace}
            />
        </>
    );
};

MapLayers.propTypes = {
    setIsSheetVisible: PropTypes.func.isRequired,
    setMapCenter: PropTypes.func.isRequired,
    setSelectedPlace: PropTypes.func.isRequired,
    setZoomLevel: PropTypes.func.isRequired,
};

export default MapLayers;
