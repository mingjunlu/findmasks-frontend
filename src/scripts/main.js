import 'normalize.css/normalize.css';
import '../styles/reset.css';
import 'mapbox-gl/src/css/mapbox-gl.css';
import '../styles/styles.css';
import mapboxgl from 'mapbox-gl';
import fetchData from './fetchData';
import getLastLocation from './getLastLocation';
import initializeMap from './initializeMap';
import createClusters from './createClusters';
import placeMarkers from './placeMarkers';

document.addEventListener('DOMContentLoaded', async () => {
    const geoJson = await fetchData();
    if (geoJson instanceof Error) {
        // eslint-disable-next-line no-alert
        alert('無法取得藥局資料');
        return;
    }

    // Load the last known location
    const lastLocation = getLastLocation();
    const somewhereInTaipei = [121.5313043, 25.0493621];
    const initialLocation = lastLocation
        ? [lastLocation.longitude, lastLocation.latitude]
        : somewhereInTaipei;

    // Mapbox settings
    mapboxgl.accessToken = process.env.MAPBOX_TOKEN;
    const maskMap = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: initialLocation,
        zoom: lastLocation ? 14 : 9,
        minZoom: 6,
    });

    maskMap.on('load', () => {
        initializeMap(geoJson, maskMap);
        createClusters(maskMap);
        placeMarkers(maskMap);

        // Show control buttons
        const controlsDiv = document.querySelector('.controls');
        controlsDiv.classList.remove('controls--invisible');
    });

    // Remove loading screen
    const loadingScreen = document.querySelector('.loading-layer');
    loadingScreen.addEventListener('transitionend', (event) => { event.target.remove(); });
    loadingScreen.classList.add('loading-layer--transparent');
});
