import Sheet from '../classes/Sheet';
import loadMarkerImages from './loadMarkerImages';
import setLastLocation from './setLastLocation';

const placeMarkers = async (map, time) => {
    // Load marker images
    const markerImages = await Promise.allSettled(loadMarkerImages([
        { id: 'insufficient-marker', color: 'rgb(142, 142, 147)' },
        { id: 'caution-marker', color: 'rgb(230, 126, 34)' },
        { id: 'sufficient-marker', color: 'rgb(17, 120, 122)' },
    ]));
    markerImages.forEach(({ value: image }) => { map.addImage(image.id, image); });

    // Paint the marker
    map.addLayer({
        id: 'unclustered-point',
        type: 'symbol',
        source: 'places',
        filter: ['!', ['has', 'point_count']],
        layout: {
            'icon-allow-overlap': false,
            'text-field': '{name}',
            'text-size': 12,
            'text-letter-spacing': 0.05,
            'text-offset': [0, 1.6],
            'icon-image': [
                'step',
                ['get', 'masksLeft'],
                'insufficient-marker',
                20,
                'caution-marker',
                100,
                'sufficient-marker',
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
    });

    // Show place info on click
    const sheet = new Sheet('sheet');
    map.on('click', 'unclustered-point', (event) => {
        const [feature] = event.features;
        const { geometry, properties } = feature;
        sheet.update({ ...properties, updatedAt: time });
        sheet.show();

        // Update the last known location
        setLastLocation({
            longitude: geometry.coordinates[0],
            latitude: geometry.coordinates[1],
        });
    });

    // Change the cursor on hover & blur
    map.on('mouseenter', 'unclustered-point', () => {
        map.getCanvas().style.setProperty('cursor', 'pointer');
    });
    map.on('mouseleave', 'unclustered-point', () => {
        map.getCanvas().style.removeProperty('cursor');
    });
};

export default placeMarkers;
