import getLastLocation from './getLastLocation';
import locateUser from './locateUser';

const initializeMap = (map) => {
    // eslint-disable-next-line no-undef
    const Leaflet = L;

    const lastLocation = getLastLocation();
    const somewhereInTaipei = [25.0493621, 121.5313043];
    const initialLocation = lastLocation
        ? [lastLocation.latitude, lastLocation.longitude]
        : somewhereInTaipei;

    map.attributionControl.setPrefix(''); // Remove the "Leaflet" prefix
    map.setView(initialLocation, (lastLocation ? 14 : 11));

    // Show the map
    Leaflet
        .tileLayer('https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}@2x.png?key={accessToken}', {
            attribution: `
                <footer>
                    © <a href="https://www.maptiler.com/copyright/" target="_blank">MapTiler</a> | © <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors
                </footer>
            `,
            minZoom: 7,
            accessToken: process.env.MAPTILER_TOKEN,
        })
        .addTo(map);

    // Add locate button to top left
    Leaflet.easyButton('fa-location-arrow', locateUser, '定位').addTo(map);
};

export default initializeMap;
