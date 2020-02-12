import setLastLocation from './setLastLocation';

const placeMarkers = (data, map) => {
    // eslint-disable-next-line no-undef
    const Leaflet = L;
    const markers = Leaflet.markerClusterGroup({ chunkedLoading: true });

    data.forEach((pharmacy) => {
        // Calculate how much perecent of masks left
        const maskQuota = 200;
        const rate = Math.round((pharmacy.masksLeft / maskQuota) * 100);

        // Assign classes to markers
        let className;
        switch (true) {
            case (rate >= 50):
                className = '';
                break;
            case (rate >= 5):
                className = 'caution';
                break;
            default:
                className = 'insufficient';
        }

        // Create a marker
        const markerIcon = Leaflet.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/images/marker-shadow.png',
            className,
        });
        const { latitude, longitude } = pharmacy.coordinates;
        const marker = Leaflet.marker([latitude, longitude], { icon: markerIcon });
        const popup = `
            <address>
                <span><strong>${pharmacy.name}</strong></span><br />
                <a href="tel:${pharmacy.phone.replace(/\(0.*\)/, '+886')}">${pharmacy.phone}</a><br />
                <a href="https://www.google.com/maps?q=${pharmacy.address}">${pharmacy.address}</a><br />
            </address>
            <p>
                <span>成人口罩：${pharmacy.masksLeft}</span><br />
                <span>兒童口罩：${pharmacy.childMasksLeft}</span>
            </p>
            <p class="footnote">口罩數量以藥局實際存量為主，線上查詢之數量僅供參考。</p>
        `;

        // Add a popup to the marker
        marker.bindPopup(popup, { maxWidth: 260 });
        marker.on('click', (event) => {
            setLastLocation({
                longitude: event.latlng.lng,
                latitude: event.latlng.lat,
            });
        });

        // Add the marker into cluster group
        markers.addLayer(marker);
    });

    // Add all markers to map
    map.addLayer(markers);
};

export default placeMarkers;
