import createClusters from './createClusters';
import placeMarkers from './placeMarkers';
import locateUser from './locateUser';

const initializeMap = async (promise, map) => {
    const geoJson = await promise;
    if (geoJson instanceof Error) {
        // eslint-disable-next-line no-alert
        alert('無法取得資料');
        return;
    }

    // Load GeoJson data
    map.addSource('places', {
        type: 'geojson',
        data: geoJson,
        cluster: true,
        clusterMaxZoom: 13,
        clusterRadius: 80,
    });

    // Create clusters & markers
    createClusters(map);
    placeMarkers(map);

    // Allow users to locate themselves
    const locateButton = document.querySelector('.controls__icon--locate').parentElement;
    locateButton.addEventListener('click', async (event) => {
        event.target.setAttribute('disabled', true);
        await locateUser(map);
        event.target.removeAttribute('disabled');
    });

    // Show control buttons
    const controlsDiv = document.querySelector('.controls');
    controlsDiv.classList.remove('controls--invisible');

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
};

export default initializeMap;
