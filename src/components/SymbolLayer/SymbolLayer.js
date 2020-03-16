import React from 'react';
import { Layer } from 'react-mapbox-gl';
import generateIcon from './generateIcon';
import symbolLayerProps from './symbolLayerProps';

const images = [
    ['pharmacy--insufficient', generateIcon({ backgroundColor: 'rgb(142, 142, 147)' })],
    ['pharmacy--acceptable', generateIcon({ backgroundColor: 'rgb(230, 126, 34)' })],
    ['pharmacy--sufficient', generateIcon({ backgroundColor: 'rgb(17, 120, 122)' })],
];

const SymbolLayer = () => (
    <Layer
        id={symbolLayerProps.id}
        type={symbolLayerProps.type}
        sourceId={symbolLayerProps.sourceId}
        images={images}
        filter={symbolLayerProps.filter}
        layout={symbolLayerProps.layout}
        paint={symbolLayerProps.paint}
    />
);

export default SymbolLayer;
