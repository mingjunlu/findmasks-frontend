import papa from 'papaparse';
import createMarker from './createMarker';
import transformHeader from './transformHeader';

const placeMarkers = async (map) => {
    // eslint-disable-next-line no-undef
    const Leaflet = L;
    const markers = Leaflet.markerClusterGroup({ chunkedLoading: true });

    try {
        await new Promise((resolve, reject) => {
            const parseConfig = {
                header: true,
                transformHeader,
                dynamicTyping: true,
                step(row) {
                    createMarker(row.data, markers);
                },
                complete() {
                    resolve();
                },
                error(err) {
                    reject(err);
                },
                download: true,
                skipEmptyLines: true,
            };
            papa.parse('/pharmacies?format=csv', parseConfig);
        });
    } catch (error) {
        // eslint-disable-next-line no-alert
        alert('無法取得藥局資料');
        return;
    }

    // Add all markers to map
    map.addLayer(markers);
};

export default placeMarkers;
