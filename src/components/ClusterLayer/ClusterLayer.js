import React from 'react';
import PropTypes from 'prop-types';
import { Layer } from 'react-mapbox-gl';
import clusterLayerProps from './clusterLayerProps';

const ClusterLayer = ({ setMapCenter, setZoomLevel }) => {
    const inspectCluster = (event) => {
        setZoomLevel((prevState) => (prevState + 1.5));
        setMapCenter(event.features[0].geometry.coordinates);
    };

    return (
        <Layer
            id={clusterLayerProps.id}
            type={clusterLayerProps.type}
            sourceId={clusterLayerProps.sourceId}
            filter={clusterLayerProps.filter}
            paint={clusterLayerProps.paint}
            onClick={inspectCluster}
        />
    );
};

ClusterLayer.propTypes = {
    setMapCenter: PropTypes.func.isRequired,
    setZoomLevel: PropTypes.func.isRequired,
};

export default ClusterLayer;
