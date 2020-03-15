const symbolLayerProps = {
    id: 'unclustered-point',
    type: 'symbol',
    sourceId: 'places',
    filter: ['!', ['has', 'point_count']],
    layout: {
        'text-field': '{name}',
        'text-size': 11,
        'text-letter-spacing': 0.05,
        'text-offset': [0.9, 1.05],
        'text-variable-anchor': ['bottom', 'top', 'right', 'left'],
        'icon-size': 0.4,
        'icon-image': [
            'step',
            ['get', 'masksLeft'],
            'pharmacy--insufficient',
            20,
            'pharmacy--acceptable',
            100,
            'pharmacy--sufficient',
        ],
    },
    paint: {
        'text-halo-color': 'rgb(255, 255, 255)',
        'text-halo-width': 1,
        'text-color': [
            'step',
            ['get', 'masksLeft'],
            'rgb(142, 142, 147)',
            20,
            'rgb(230, 126, 34)',
            100,
            'rgb(17, 120, 122)',
        ],
    },
};

export default symbolLayerProps;
