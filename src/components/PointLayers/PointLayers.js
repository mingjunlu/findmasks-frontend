import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';
import { Layer } from 'react-mapbox-gl';
import LastLocation from '../../classes/LastLocation';
import changeCursor from '../../utilities/changeCursor';
import generateImages from './generateImages';
import { unclusteredPointProps, selectedPointProps, selectedDotProps } from './pointLayersProps';

const images = generateImages();
const isProduction = (process.env.NODE_ENV === 'production');

const SymbolLayer = () => {
    const history = useHistory();
    const { pathname } = useLocation();

    const displayPlaceInfo = async (event) => {
        const { geometry, properties } = event.features[0];

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
        <>
            <Layer
                id={unclusteredPointProps.id}
                type={unclusteredPointProps.type}
                sourceId={unclusteredPointProps.sourceId}
                images={images}
                filter={unclusteredPointProps.getFilter(pathname)}
                layout={{
                    ...unclusteredPointProps.layout,
                    'icon-image': unclusteredPointProps.getIconImage(),
                }}
                paint={{
                    ...unclusteredPointProps.paint,
                    'text-color': unclusteredPointProps.getTextColor(),
                }}
                onClick={displayPlaceInfo}
                onMouseEnter={changeCursor}
                onMouseLeave={changeCursor}
            />
            <Layer
                id={selectedPointProps.id}
                type={selectedPointProps.type}
                sourceId={selectedPointProps.sourceId}
                images={images}
                filter={selectedPointProps.getFilter(pathname)}
                layout={{
                    ...selectedPointProps.layout,
                    'icon-image': selectedPointProps.getIconImage(),
                }}
                paint={{
                    ...selectedPointProps.paint,
                    'text-color': selectedPointProps.getTextColor(),
                }}
            />
            <Layer
                id={selectedDotProps.id}
                type={selectedDotProps.type}
                sourceId={selectedDotProps.sourceId}
                filter={selectedDotProps.getFilter(pathname)}
                paint={{
                    ...selectedDotProps.paint,
                    'circle-color': selectedDotProps.getCircleColor(),
                }}
            />
        </>
    );
};

export default SymbolLayer;
