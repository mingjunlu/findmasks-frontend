import locateUser from './locateUser';

const initializeMap = (data, map) => {
    // Change labels to Traditional Chinese
    map.getStyle().layers.forEach((layer) => {
        if (layer.id.endsWith('-label')) {
            map.setLayoutProperty(layer.id, 'text-field', [
                'coalesce',
                ['get', 'name_zh-Hant'],
                ['get', 'name'],
            ]);
        }
    });

    // Allow users to locate themselves
    const locateButton = document.querySelector('.controls__icon--locate').parentElement;
    locateButton.addEventListener('click', async (event) => {
        event.target.setAttribute('disabled', true);
        await locateUser(map);
        event.target.removeAttribute('disabled');
    });

    // Load GeoJson data
    map.addSource('pharmacies', {
        type: 'geojson',
        data,
        cluster: true,
        clusterMaxZoom: 13,
        clusterRadius: 80,
    });
};

export default initializeMap;
