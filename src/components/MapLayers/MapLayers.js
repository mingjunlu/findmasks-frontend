import React from 'react';
import PropTypes from 'prop-types';
import { Source } from 'react-mapbox-gl';
import UserLocationLayers from '../UserLocationLayers/UserLocationLayers';
import ClusterLayer from '../ClusterLayer/ClusterLayer';
import PointLayers from '../PointLayers/PointLayers';
import sourceProps from './sourceProps';

const MapLayers = (props) => {
    const {
        userPosition,
        setMapCenter,
        setZoomLevel,
        features,
        sortedMaskNumbers,
    } = props;

    const hasData = (features.length > 0);
    if (!hasData) { return null; }

    return (
        <>
            <Source
                id="user-location"
                geoJsonSource={{
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: userPosition.coordinates,
                        },
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
            <UserLocationLayers radius={userPosition.radius} />
            <ClusterLayer setMapCenter={setMapCenter} setZoomLevel={setZoomLevel} />
            <PointLayers sortedMaskNumbers={sortedMaskNumbers} />
        </>
    );
};

MapLayers.propTypes = {
    userPosition: PropTypes.exact({
        coordinates: PropTypes.arrayOf(PropTypes.number),
        radius: PropTypes.number,
    }).isRequired,
    setMapCenter: PropTypes.func.isRequired,
    setZoomLevel: PropTypes.func.isRequired,
    features: PropTypes.arrayOf(PropTypes.exact({
        type: PropTypes.oneOf(['Feature']),
        geometry: PropTypes.exact({
            type: PropTypes.oneOf(['Point']),
            coordinates: PropTypes.arrayOf(PropTypes.number),
        }),
        properties: PropTypes.exact({
            id: PropTypes.string,
            name: PropTypes.string,
            masksLeft: PropTypes.number,
            childMasksLeft: PropTypes.number,
            updatedAt: PropTypes.string,
        }),
    })).isRequired,
    sortedMaskNumbers: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default MapLayers;
