import React from 'react';
import PropTypes from 'prop-types';
import { Source } from 'react-mapbox-gl';
import useFetch from '../../hooks/useFetch';
import ErrorScreen from '../ErrorScreen/ErrorScreen';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import ClusterLayer from '../ClusterLayer/ClusterLayer';
import SymbolLayer from '../SymbolLayer/SymbolLayer';
import sourceProps from './sourceProps';

const MapLayers = ({ setMapCenter, setZoomLevel }) => {
    const featureCollection = useFetch(process.env.REACT_APP_ENDPOINT, undefined, {
        type: 'FeatureCollection',
        features: [],
    });

    const hasError = (featureCollection instanceof Error);
    if (hasError) { return <ErrorScreen message="無法取得資料" />; }

    const hasData = (featureCollection.features.length > 0);
    if (!hasData) { return <LoadingScreen />; }

    return (
        <>
            <Source id="places" geoJsonSource={{ ...sourceProps, data: featureCollection }} />
            <ClusterLayer setMapCenter={setMapCenter} setZoomLevel={setZoomLevel} />
            <SymbolLayer />
        </>
    );
};

MapLayers.propTypes = {
    setMapCenter: PropTypes.func.isRequired,
    setZoomLevel: PropTypes.func.isRequired,
};

export default MapLayers;
