import React from 'react';
import PropTypes from 'prop-types';
import { Layer } from 'react-mapbox-gl';
import LastLocation from '../../classes/LastLocation';
import generateIcon from './generateIcon';
import symbolLayerProps from './symbolLayerProps';

const images = [
    ['pharmacy--insufficient', generateIcon({ backgroundColor: 'rgb(142, 142, 147)' })],
    ['pharmacy--acceptable', generateIcon({ backgroundColor: 'rgb(230, 126, 34)' })],
    ['pharmacy--sufficient', generateIcon({ backgroundColor: 'rgb(17, 120, 122)' })],
];

const SymbolLayer = ({ setIsSheetVisible, setSelectedPlace }) => {
    const displayPlaceInfo = async (event) => {
        const { geometry, properties } = event.features[0];
        setSelectedPlace({
            id: properties.id,
            name: properties.name,
            masksLeft: properties.masksLeft,
            childMasksLeft: properties.childMasksLeft,
        });
        setIsSheetVisible(true);

        // Update the last location
        const newLocation = new LastLocation(geometry.coordinates);
        newLocation.save();

        try {
            const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/${properties.id}`);
            const feature = await response.json();
            setSelectedPlace(feature.properties);
        } catch (error) {
            setSelectedPlace(error);
        }
    };

    return (
        <Layer
            id={symbolLayerProps.id}
            type={symbolLayerProps.type}
            sourceId={symbolLayerProps.sourceId}
            images={images}
            filter={symbolLayerProps.filter}
            layout={symbolLayerProps.layout}
            paint={symbolLayerProps.paint}
            onClick={displayPlaceInfo}
        />
    );
};

SymbolLayer.propTypes = {
    setIsSheetVisible: PropTypes.func.isRequired,
    setSelectedPlace: PropTypes.func.isRequired,
};

export default SymbolLayer;
