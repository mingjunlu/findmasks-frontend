import 'fg-loadcss/dist/cssrelpreload';
import initializeMap from './initializeMap';
import placeMarkers from './placeMarkers';

document.addEventListener('DOMContentLoaded', async () => {
    // eslint-disable-next-line no-undef
    const Leaflet = L;
    const maskMap = Leaflet.map('map', { preferCanvas: true });

    // Draw the map
    initializeMap(maskMap);
    await placeMarkers(maskMap);

    // Remove loading screen
    const layer = document.querySelector('.loading-layer');
    layer.addEventListener('transitionend', (event) => { event.target.remove(); });
    layer.classList.add('loading-layer--transparent');
});
