import React, { useState } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import MapLayers from '../MapLayers/MapLayers';
import mapProps from './mapProps';

const InteractiveMap = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
    dragRotate: false,
});

const MaskMap = () => {
    const [zoomLevel, setZoomLevel] = useState(9);
    const [mapCenter, setMapCenter] = useState([121.5313043, 25.0493621]);

    const synchronizeZoomLevel = (event, { originalEvent }) => {
        if (originalEvent) {
            const { lastZoom } = event.style.zoomHistory;
            setZoomLevel(lastZoom);
        }
    };

    return (
        <InteractiveMap
            center={mapCenter}
            containerStyle={mapProps.containerStyle}
            maxBounds={mapProps.maxBounds}
            onStyleLoad={mapProps.changeMapLanguage}
            onZoomEnd={synchronizeZoomLevel}
            // eslint-disable-next-line react/style-prop-object
            style="mapbox://styles/mapbox/light-v10?optimize=true"
            zoom={[zoomLevel]}
        >
            <MapLayers setMapCenter={setMapCenter} setZoomLevel={setZoomLevel} />
        </InteractiveMap>
    );
};

export default MaskMap;
