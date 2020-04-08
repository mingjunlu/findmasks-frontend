import React from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import { Layer } from 'react-mapbox-gl';
import LastLocation from '../../classes/LastLocation';
import changeCursor from '../../utilities/changeCursor';
import clusterLayerProps from './clusterLayerProps';

const isProduction = (process.env.NODE_ENV === 'production');

const ClusterLayer = ({ setMapCenter, setZoomLevel }) => {
    const inspectCluster = (event) => {
        const { coordinates } = event.features[0].geometry;

        // Zoom in and update mapCenter
        setZoomLevel((prevState) => {
            const higherZoomLevel = prevState + 1.5;
            return higherZoomLevel;
        });
        setMapCenter(coordinates);

        // Update the last location
        const newLocation = new LastLocation(coordinates);
        newLocation.save();

        // Track the click event
        if (isProduction) {
            ReactGA.event({
                category: 'ClusterLayer',
                action: 'Clicked a cluster',
            });
        }
    };

    return (
        <Layer
            id={clusterLayerProps.id}
            type={clusterLayerProps.type}
            sourceId={clusterLayerProps.sourceId}
            filter={clusterLayerProps.filter}
            paint={clusterLayerProps.paint}
            onClick={inspectCluster}
            onMouseEnter={changeCursor}
            onMouseLeave={changeCursor}
        />
    );
};

ClusterLayer.propTypes = {
    setMapCenter: PropTypes.func.isRequired,
    setZoomLevel: PropTypes.func.isRequired,
};

export default ClusterLayer;
