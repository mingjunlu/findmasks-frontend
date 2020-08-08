import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import ReactMapboxGl from 'react-mapbox-gl';
import MapLayers from '../MapLayers/MapLayers';
import mapProps from './mapProps';

const InteractiveMap = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
    dragRotate: false,
});

const MaskMap = (props) => {
    const {
        mapCenter,
        setMapCenter,
        setZoomLevel,
        zoomLevel,
        userPosition,
    } = props;

    const { pathname } = useLocation();
    const history = useHistory();
    const unhighlightSymbol = (map, event) => {
        if (!pathname.startsWith('/places/')) { return; }
        const clickedSymbols = map
            .queryRenderedFeatures(event.point)
            .filter((feature) => (feature.layer.id === 'unclustered-point'));
        if (clickedSymbols.length > 0) { return; }
        history.push('/');
    };

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

    return (
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
            <MapLayers
                userPosition={userPosition}
                setMapCenter={setMapCenter}
                setZoomLevel={setZoomLevel}
            />
        </InteractiveMap>
    );
};

MaskMap.propTypes = {
    mapCenter: PropTypes.arrayOf(PropTypes.number).isRequired,
    setMapCenter: PropTypes.func.isRequired,
    setZoomLevel: PropTypes.func.isRequired,
    zoomLevel: PropTypes.number.isRequired,
    userPosition: PropTypes.exact({
        coordinates: PropTypes.arrayOf(PropTypes.number),
        radius: PropTypes.number,
    }).isRequired,
};

export default MaskMap;
