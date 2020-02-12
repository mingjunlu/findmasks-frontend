import 'fg-loadcss/dist/cssrelpreload';
import fetchData from './fetchData';
import initializeMap from './initializeMap';
import placeMarkers from './placeMarkers';

document.addEventListener('DOMContentLoaded', async () => {
    const promise = fetchData();

    // eslint-disable-next-line no-undef
    const Leaflet = L;
    const maskMap = Leaflet.map('map', { preferCanvas: true });
    initializeMap(maskMap);

    const pharmacies = await promise;
    if (pharmacies instanceof Error) {
        // eslint-disable-next-line no-alert
        alert('無法取得藥局資料');
        return;
    }

    placeMarkers(pharmacies, maskMap);

    // Remove loading screen
    const layer = document.querySelector('.loading-layer');
    layer.addEventListener('transitionend', (event) => { event.target.remove(); });
    layer.classList.add('loading-layer--transparent');
});
