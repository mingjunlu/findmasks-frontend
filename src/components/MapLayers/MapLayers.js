import React from 'react';
import PropTypes from 'prop-types';
import { Source } from 'react-mapbox-gl';
import useFetch from '../../hooks/useFetch';
import ClusterLayer from '../ClusterLayer/ClusterLayer';
import SymbolLayer from '../SymbolLayer/SymbolLayer';

const MapLayers = ({ setMapCenter, setZoomLevel }) => {
    const featureCollection = useFetch(process.env.REACT_APP_ENDPOINT, undefined, {
        type: 'FeatureCollection',
        features: [],
    });

    if (featureCollection instanceof Error) { return null; }
    if (featureCollection.features.length === 0) { return null; }

    const geoJsonSource = {
        type: 'geojson',
        data: featureCollection,
        cluster: true,
        clusterMaxZoom: 13,
        clusterRadius: 80,
    };

    return (
        <>
            <Source id="places" geoJsonSource={geoJsonSource} />
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
