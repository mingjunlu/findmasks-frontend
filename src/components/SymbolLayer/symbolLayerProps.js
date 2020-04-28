import dayjs from 'dayjs';

const anHourAgo = dayjs().subtract(1, 'hour').toISOString();
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
            'case',
            ['<', ['to-string', ['get', 'updatedAt']], anHourAgo],
            ['concat', placeType, '--insufficient'],
            [
                'step',
                ['get', 'childMasksLeft'],
                ['concat', placeType, '--insufficient'],
                Math.round(200 * 0.15),
                ['concat', placeType, '--acceptable'],
                Math.round(200 * 0.60),
                ['concat', placeType, '--sufficient'],
            ],
        ],
        'icon-size': 0.4,
    },
    paint: {
        'text-halo-color': 'rgb(250, 250, 255)',
        'text-halo-width': 1,
        'text-color': [
            'case',
            ['<', ['to-string', ['get', 'updatedAt']], anHourAgo],
            'rgb(142, 142, 147)',
            [
                'step',
                ['get', 'childMasksLeft'],
                'rgb(142, 142, 147)',
                Math.round(200 * 0.15),
                'rgb(230, 126, 34)',
                Math.round(200 * 0.60),
                'rgb(17, 120, 122)',
            ],
        ],
        'text-opacity': [
            'case',
            ['boolean', ['feature-state', 'isSelected'], false],
            1.0,
            0.8,
        ],
        'icon-opacity': [
            'case',
            ['boolean', ['feature-state', 'isSelected'], false],
            1.00,
            0.75,
        ],
    },
};

export default symbolLayerProps;
