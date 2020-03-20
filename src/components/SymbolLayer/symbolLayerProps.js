const placeType = [
    'case',
    ['in', '藥局', ['get', 'name']],
    'pharmacy',
    'health-center',
];

const symbolLayerProps = {
    id: 'unclustered-point',
    type: 'symbol',
    sourceId: 'places',
    filter: ['!', ['has', 'point_count']],
    layout: {
        'text-field': '{name}',
        'text-size': 12,
        'text-letter-spacing': 0.05,
        'text-offset': [0.9, 1.05],
        'text-variable-anchor': ['bottom', 'top'],
        'icon-image': [
            'step',
            ['get', 'masksLeft'],
            ['concat', placeType, '--insufficient'],
            20,
            ['concat', placeType, '--acceptable'],
            100,
            ['concat', placeType, '--sufficient'],
        ],
        'icon-size': 0.4,
    },
    paint: {
        'text-halo-color': 'rgb(250, 250, 255)',
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
