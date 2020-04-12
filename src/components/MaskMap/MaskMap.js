import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ReactMapboxGl from 'react-mapbox-gl';
import MapLayers from '../MapLayers/MapLayers';
import mapProps from './mapProps';

const InteractiveMap = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
    attributionControl: false,
    dragRotate: false,
});

const MaskMap = (props) => {
    const {
        mapCenter,
        setMapCenter,
        setZoomLevel,
        zoomLevel,
    } = props;

    const history = useHistory();

    const synchronizeZoomLevel = (event, { originalEvent }) => {
        if (originalEvent) {
            const { lastZoom } = event.style.zoomHistory;
            const { minZoom, maxZoom } = mapProps;

            const isValidZoomLevel = (lastZoom >= minZoom) && (lastZoom <= maxZoom);
            if (isValidZoomLevel) {
                setZoomLevel(lastZoom);
            }
        }
    };

    const unhighlightSymbol = (map) => {
        const features = map.queryRenderedFeatures();
        const selectedFeature = features.find((feature) => !!feature.state.isSelected);
        if (selectedFeature) {
            map.removeFeatureState({
                id: selectedFeature.id,
                source: 'places',
            });
            history.push('/');
        }
    };

    return (
        <>
            <InteractiveMap
                center={mapCenter}
                containerStyle={mapProps.containerStyle}
                maxBounds={mapProps.maxBounds}
                maxZoom={mapProps.maxZoom}
                minZoom={mapProps.minZoom}
                onStyleLoad={mapProps.changeMapLanguage}
                onZoomEnd={synchronizeZoomLevel}
                // eslint-disable-next-line react/style-prop-object
                style="mapbox://styles/mapbox/light-v10?optimize=true"
                zoom={[zoomLevel]}
                onClick={unhighlightSymbol}
            >
                <MapLayers setMapCenter={setMapCenter} setZoomLevel={setZoomLevel} />
            </InteractiveMap>
        </>
    );
};

MaskMap.propTypes = {
    mapCenter: PropTypes.arrayOf(PropTypes.number).isRequired,
    setMapCenter: PropTypes.func.isRequired,
    setZoomLevel: PropTypes.func.isRequired,
    zoomLevel: PropTypes.number.isRequired,
};

export default MaskMap;
