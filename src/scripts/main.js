import fetchData from './fetchData';
import initializeMap from './initializeMap';
import placeMarkers from './placeMarkers';

document.addEventListener('DOMContentLoaded', async () => {
    // Get data
    const pharmacies = await fetchData();
    if (pharmacies instanceof Error) {
        // eslint-disable-next-line no-alert
        alert('無法取得藥局資料');
        return;
    }

    // eslint-disable-next-line no-undef
    const Leaflet = L;

    // Draw the map
    const maskMap = Leaflet.map('map', { preferCanvas: true });
    initializeMap(maskMap);
    placeMarkers(pharmacies, maskMap);

    // Remove loading screen
    const layer = document.querySelector('.loading-layer');
    layer.addEventListener('transitionend', (event) => { event.target.remove(); });
    layer.classList.add('loading-layer--transparent');
});
