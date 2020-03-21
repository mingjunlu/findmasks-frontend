import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactMapboxGl from 'react-mapbox-gl';
import LastLocation from '../../classes/LastLocation';
import MapLayers from '../MapLayers/MapLayers';
import mapProps from './mapProps';

const InteractiveMap = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
    dragRotate: false,
});

const MaskMap = ({ setIsSheetVisible, setSelectedPlace }) => {
    const [zoomLevel, setZoomLevel] = useState(null);
    const [mapCenter, setMapCenter] = useState(null);

    // Restore the last location
    useEffect(() => {
        const somewhereInTaipei = [121.5313043, 25.0493621];
        const lastLocation = LastLocation.restore();
        setZoomLevel(lastLocation ? 14 : 9);
        setMapCenter(lastLocation || somewhereInTaipei);
    }, []);

    if (!zoomLevel || !mapCenter) { return null; }

    const synchronizeZoomLevel = (event, { originalEvent }) => {
        if (originalEvent) {
            const { lastZoom } = event.style.zoomHistory;
            setZoomLevel(lastZoom);
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
            setIsSheetVisible(false);
        }
    };

    return (
        <>
            <InteractiveMap
                center={mapCenter}
                containerStyle={mapProps.containerStyle}
                maxBounds={mapProps.maxBounds}
                onStyleLoad={mapProps.changeMapLanguage}
                onZoomEnd={synchronizeZoomLevel}
                // eslint-disable-next-line react/style-prop-object
                style="mapbox://styles/mapbox/light-v10?optimize=true"
                zoom={[zoomLevel]}
                onClick={unhighlightSymbol}
            >
                <MapLayers
                    setIsSheetVisible={setIsSheetVisible}
                    setMapCenter={setMapCenter}
                    setSelectedPlace={setSelectedPlace}
                    setZoomLevel={setZoomLevel}
                />
            </InteractiveMap>
        </>
    );
};

MaskMap.propTypes = {
    setIsSheetVisible: PropTypes.func.isRequired,
    setSelectedPlace: PropTypes.func.isRequired,
};

export default MaskMap;
