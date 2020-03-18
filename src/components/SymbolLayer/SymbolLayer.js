import React from 'react';
import PropTypes from 'prop-types';
import { Layer } from 'react-mapbox-gl';
import LastLocation from '../../classes/LastLocation';
import changeCursor from '../../utilities/changeCursor';
import generateImages from './generateImages';
import symbolLayerProps from './symbolLayerProps';

const images = generateImages();

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
            onMouseEnter={changeCursor}
            onMouseLeave={changeCursor}
        />
    );
};

SymbolLayer.propTypes = {
    setIsSheetVisible: PropTypes.func.isRequired,
    setSelectedPlace: PropTypes.func.isRequired,
};

export default SymbolLayer;
