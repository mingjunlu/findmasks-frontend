const createClusters = (map) => {
    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'places',
        filter: ['has', 'point_count'],
        paint: {
            'circle-stroke-width': 8,
            'circle-radius': 15,
            'circle-color': 'rgb(17, 120, 122)',
            'circle-stroke-color': 'rgba(17, 120, 122, 0.6)',
        },
    });

    // Inspect a cluster on click
    map.on('click', 'clusters', (event) => {
        const [feature] = map.queryRenderedFeatures(event.point, { layers: ['clusters'] });
        const { cluster_id: clusterId } = feature.properties;
        map.getSource('places').getClusterExpansionZoom(clusterId, (error, zoomValue) => {
            if (error) { return; }
            map.easeTo({
                center: feature.geometry.coordinates,
                zoom: zoomValue + 1,
            });
        });
    });

    // Change the cursor on hover & blur
    map.on('mouseenter', 'clusters', () => {
        map.getCanvas().style.setProperty('cursor', 'pointer');
    });
    map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.removeProperty('cursor');
    });
};

export default createClusters;
