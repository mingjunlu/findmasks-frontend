import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';
import { Layer } from 'react-mapbox-gl';
import LastLocation from '../../classes/LastLocation';
import getQuantile from '../../utilities/getQuantile';
import changeCursor from '../../utilities/changeCursor';
import generateImages from './generateImages';
import { unclusteredPointProps, selectedPointProps, selectedDotProps } from './pointLayersProps';

const images = generateImages();
const isProduction = (process.env.NODE_ENV === 'production');

const SymbolLayer = ({ sortedMaskNumbers }) => {
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

    const firstQuarter = getQuantile(sortedMaskNumbers, 0.25);
    const secondQuarter = getQuantile(sortedMaskNumbers, 0.5);

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
                    'icon-image': unclusteredPointProps.getIconImage(firstQuarter, secondQuarter),
                }}
                paint={{
                    ...unclusteredPointProps.paint,
                    'text-color': unclusteredPointProps.getTextColor(firstQuarter, secondQuarter),
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
                    'icon-image': selectedPointProps.getIconImage(firstQuarter, secondQuarter),
                }}
                paint={{
                    ...selectedPointProps.paint,
                    'text-color': selectedPointProps.getTextColor(firstQuarter, secondQuarter),
                }}
            />
            <Layer
                id={selectedDotProps.id}
                type={selectedDotProps.type}
                sourceId={selectedDotProps.sourceId}
                filter={selectedDotProps.getFilter(pathname)}
                paint={{
                    ...selectedDotProps.paint,
                    'circle-color': selectedDotProps.getCircleColor(firstQuarter, secondQuarter),
                }}
            />
        </>
    );
};

SymbolLayer.propTypes = {
    sortedMaskNumbers: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default SymbolLayer;
