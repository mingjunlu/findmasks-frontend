import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Source } from 'react-mapbox-gl';
import fetchData from '../../utilities/fetchData';
import ErrorScreen from '../ErrorScreen/ErrorScreen';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import MapControls from '../MapControls/MapControls';
import UserLocationLayers from '../UserLocationLayers/UserLocationLayers';
import ClusterLayer from '../ClusterLayer/ClusterLayer';
import PointLayers from '../PointLayers/PointLayers';
import sourceProps from './sourceProps';

const MapLayers = ({ setMapCenter, setZoomLevel }) => {
    const [features, setFeatures] = useState([]);
    useEffect(() => {
        let isMounted = true;
        const getFeatureCollection = async () => {
            const collection = await fetchData(process.env.REACT_APP_ENDPOINT);
            if (isMounted) {
                setFeatures((collection instanceof Error) ? collection : collection.features);
            }
        };
        getFeatureCollection();
        return () => { isMounted = false; }; // Prevent setting state after unmounted
    }, []);

    const initialRadius = 0;
    const [position, setPosition] = useState({
        coordinates: [],
        radius: initialRadius,
    });

    const hasError = (features instanceof Error);
    if (hasError) { return <ErrorScreen message="無法取得資料" />; }

    const hasData = (features.length > 0);
    if (!hasData) { return <LoadingScreen />; }

    return (
        <>
            <MapControls
                setMapCenter={setMapCenter}
                setPosition={setPosition}
                setZoomLevel={setZoomLevel}
            />
            <Source
                id="user-location"
                geoJsonSource={{
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        geometry: { type: 'Point', coordinates: position.coordinates },
                    },
                }}
            />
            <Source
                id="places"
                geoJsonSource={{
                    ...sourceProps,
                    data: { type: 'FeatureCollection', features },
                }}
            />
            <UserLocationLayers radius={position.radius} />
            <ClusterLayer setMapCenter={setMapCenter} setZoomLevel={setZoomLevel} />
            <PointLayers />
        </>
    );
};

MapLayers.propTypes = {
    setMapCenter: PropTypes.func.isRequired,
    setZoomLevel: PropTypes.func.isRequired,
};

export default MapLayers;
