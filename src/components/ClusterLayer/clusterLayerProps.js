const clusterLayerProps = {
    id: 'clusters',
    type: 'circle',
    sourceId: 'places',
    filter: ['has', 'point_count'],
    paint: {
        'circle-stroke-width': 8,
        'circle-radius': 15,
        'circle-color': 'rgba(17, 120, 122, 0.95)',
        'circle-stroke-color': 'rgba(17, 120, 122, 0.6)',
    },
};

export default clusterLayerProps;
