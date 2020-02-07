import locateUser from './locateUser';

const initializeMap = (map) => {
    // eslint-disable-next-line no-undef
    const Leaflet = L;

    map.attributionControl.setPrefix(''); // Remove the "Leaflet" prefix
    map.setView([25.0493621, 121.5313043], 11);

    // Show the map
    Leaflet
        .tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
            attribution: `
                <footer>
                    <a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a> maps | Map data &copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors
                </footer>
            `,
            maxZoom: 16,
        })
        .addTo(map);

    // Add locate button to top left
    Leaflet.easyButton('fa-location-arrow', locateUser, '定位').addTo(map);
};

export default initializeMap;
