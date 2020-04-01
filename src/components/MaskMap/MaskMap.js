import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReactMapboxGl from 'react-mapbox-gl';
import LastLocation from '../../classes/LastLocation';
import MapLayers from '../MapLayers/MapLayers';
import mapProps from './mapProps';

const InteractiveMap = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
    dragRotate: false,
});

const MaskMap = () => {
    const history = useHistory();

    const [zoomLevel, setZoomLevel] = useState(null);
    const [mapCenter, setMapCenter] = useState(null);

    // Restore the last location
    useEffect(() => {
        const somewhereInTaipei = [121.5313043, 25.0493621];
        const lastLocation = LastLocation.restore();
        const initialZoomLevel = lastLocation ? 14 : 9;
        setZoomLevel(initialZoomLevel);
        setMapCenter(lastLocation || somewhereInTaipei);
    }, []);

    if (!zoomLevel || !mapCenter) { return null; }

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

export default MaskMap;
