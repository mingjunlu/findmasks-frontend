import React from 'react';
import { useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';
import { Layer } from 'react-mapbox-gl';
import LastLocation from '../../classes/LastLocation';
import changeCursor from '../../utilities/changeCursor';
import generateImages from './generateImages';
import symbolLayerProps from './symbolLayerProps';

const images = generateImages();
const isProduction = (process.env.NODE_ENV === 'production');

const SymbolLayer = () => {
    const history = useHistory();

    const displayPlaceInfo = async (event) => {
        const map = event.target;
        const { geometry, properties } = event.features[0];

        // Highlight the symbol
        map.setFeatureState({ id: properties.id, source: 'places' }, { isSelected: true });

        // Show place's info
        history.push(`/places/${properties.id}`, { placeName: properties.name });

        // Update the last location
        const newLocation = new LastLocation(geometry.coordinates);
        newLocation.save();

        // Track the click event
        if (isProduction) {
            ReactGA.event({
                category: 'SymbolLayer',
                action: 'Clicked a symbol',
            });
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

export default SymbolLayer;
