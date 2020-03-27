import React from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import { Layer } from 'react-mapbox-gl';
import changeCursor from '../../utilities/changeCursor';
import clusterLayerProps from './clusterLayerProps';

const ClusterLayer = ({ setMapCenter, setZoomLevel }) => {
    const inspectCluster = (event) => {
        setZoomLevel((prevState) => (prevState + 1.5));
        setMapCenter(event.features[0].geometry.coordinates);
        ReactGA.event({
            category: 'ClusterLayer',
            action: 'Clicked a cluster',
        });
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
