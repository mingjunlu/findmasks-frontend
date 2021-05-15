import dayjs from 'dayjs';

const getLastHourTime = () => dayjs().subtract(1, 'hour').toISOString();
const placeType = [
    'case',
    ['in', '藥局', ['get', 'name']],
    'pharmacy',
    'health-center',
];

const unclusteredPointProps = {
    id: 'unclustered-point',
    type: 'symbol',
    sourceId: 'places',
    layout: {
        'icon-size': 0.4,
        'text-field': '{name}',
        'text-letter-spacing': 0.05,
        'text-offset': [0.9, 1.05],
        'text-size': 12,
        'text-variable-anchor': ['bottom', 'top'],
    },
    paint: {
        'icon-opacity': 0.8,
        'text-halo-color': 'rgb(250, 250, 250)',
        'text-halo-width': 1,
        'text-opacity': 0.8,
    },
    getFilter(pathname) {
        const prefix = '/places/';
        const id = pathname.slice(prefix.length);
        return [
            'all',
            ['!has', 'point_count'],
            ['!=', 'id', id],
        ];
    },
    getIconImage(firstQuarter, secondQuarter) {
        return [
            'case',
            ['<', ['to-string', ['get', 'updatedAt']], getLastHourTime()],
            ['concat', placeType, '-40--insufficient'],
            ['==', ['get', 'masksLeft'], 0],
            ['concat', placeType, '-40--insufficient'],
            [
                'step',
                ['get', 'masksLeft'],
                ['concat', placeType, '-40--insufficient'],
                firstQuarter,
                ['concat', placeType, '-40--acceptable'],
                secondQuarter,
                ['concat', placeType, '-40--sufficient'],
            ],
        ];
    },
    getTextColor(firstQuarter, secondQuarter) {
        return [
            'case',
            ['<', ['to-string', ['get', 'updatedAt']], getLastHourTime()],
            'rgb(142, 142, 147)',
            ['==', ['get', 'masksLeft'], 0],
            'rgb(142, 142, 147)',
            [
                'step',
                ['get', 'masksLeft'],
                'rgb(142, 142, 147)',
                firstQuarter,
                'rgb(230, 126, 34)',
                secondQuarter,
                'rgb(17, 120, 122)',
            ],
        ];
    },
};

const selectedPointProps = {
    id: 'selected-point',
    type: 'symbol',
    sourceId: 'places',
    layout: {
        'icon-offset': [0, -50],
        'icon-size': 0.6,
        'text-anchor': 'bottom',
        'text-field': '{name}',
        'text-letter-spacing': 0.05,
        'text-offset': [0, 1.6],
        'text-size': 14,
    },
    paint: {
        'text-halo-color': 'rgb(250, 250, 250)',
        'text-halo-width': 1,
    },
    getFilter(pathname) {
        const prefix = '/places/';
        const id = pathname.slice(prefix.length);
        return ['==', 'id', id];
    },
    getIconImage(firstQuarter, secondQuarter) {
        return [
            'case',
            ['<', ['to-string', ['get', 'updatedAt']], getLastHourTime()],
            ['concat', placeType, '-80--insufficient'],
            ['==', ['get', 'masksLeft'], 0],
            ['concat', placeType, '-80--insufficient'],
            [
                'step',
                ['get', 'masksLeft'],
                ['concat', placeType, '-80--insufficient'],
                firstQuarter,
                ['concat', placeType, '-80--acceptable'],
                secondQuarter,
                ['concat', placeType, '-80--sufficient'],
            ],
        ];
    },
    getTextColor(firstQuarter, secondQuarter) {
        return [
            'case',
            ['<', ['to-string', ['get', 'updatedAt']], getLastHourTime()],
            'rgb(142, 142, 147)',
            ['==', ['get', 'masksLeft'], 0],
            'rgb(142, 142, 147)',
            [
                'step',
                ['get', 'masksLeft'],
                'rgb(142, 142, 147)',
                firstQuarter,
                'rgb(230, 126, 34)',
                secondQuarter,
                'rgb(17, 120, 122)',
            ],
        ];
    },
};

const selectedDotProps = {
    id: 'selected-dot',
    type: 'circle',
    sourceId: 'places',
    paint: {
        'circle-radius': 3,
    },
    getFilter(pathname) {
        const prefix = '/places/';
        const id = pathname.slice(prefix.length);
        return ['==', 'id', id];
    },
    getCircleColor(firstQuarter, secondQuarter) {
        return [
            'case',
            ['<', ['to-string', ['get', 'updatedAt']], getLastHourTime()],
            'rgb(142, 142, 147)',
            ['==', ['get', 'masksLeft'], 0],
            'rgb(142, 142, 147)',
            [
                'step',
                ['get', 'masksLeft'],
                'rgb(142, 142, 147)',
                firstQuarter,
                'rgb(230, 126, 34)',
                secondQuarter,
                'rgb(17, 120, 122)',
            ],
        ];
    },
};

export {
    unclusteredPointProps,
    selectedPointProps,
    selectedDotProps,
};
