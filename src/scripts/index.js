import 'normalize.css/normalize.css';
import '../styles/reset.css';
import 'mapbox-gl/src/css/mapbox-gl.css';
import '../styles/styles.css';
import mapboxgl from 'mapbox-gl';
import getLastLocation from './utilities/getLastLocation';
import fetchData from './utilities/fetchData';
import initializeMap from './utilities/initializeMap';

window.addEventListener('DOMContentLoaded', () => {
    // Start fetching data
    const promisedData = fetchData();

    // Load the last known location
    const lastLocation = getLastLocation();
    const somewhereInTaipei = [121.5313043, 25.0493621];
    const initialLocation = lastLocation
        ? [lastLocation.longitude, lastLocation.latitude]
        : somewhereInTaipei;

    // Set up Mapbox
    mapboxgl.accessToken = process.env.MAPBOX_TOKEN;
    const maskMap = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10?optimize=true',
        center: initialLocation,
        zoom: lastLocation ? 14 : 9,
        maxBounds: [
            [117.82303563424552, 20.555013006344305], // Bottom-left corrdinates
            [123.84450551116388, 26.833835878766501], // Top-right corrdinates
        ],
    });

    // Initialize the map
    maskMap.on('load', async () => {
        await initializeMap(promisedData, maskMap);
    });

    // Remove loading screen
    const loadingScreen = document.querySelector('.loading-layer');
    loadingScreen.addEventListener('transitionend', (event) => { event.target.remove(); });
    loadingScreen.classList.add('loading-layer--transparent');
});
