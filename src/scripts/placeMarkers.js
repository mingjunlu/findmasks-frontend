import setLastLocation from './setLastLocation';

const placeMarkers = (data, map) => {
    // eslint-disable-next-line no-undef
    const Leaflet = L;
    const markers = Leaflet.markerClusterGroup({ chunkedLoading: true });

    data.forEach((pharmacy) => {
        const {
            name,
            address,
            phone,
            coordinates,
            masksLeft,
            childMasksLeft,
        } = pharmacy;

        // Calculate how much perecent of masks left
        const maskQuota = 200;
        const rate = Math.round((masksLeft / maskQuota) * 100);

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
        const marker = Leaflet.marker(coordinates, { icon: markerIcon });
        const popup = `
            <address>
                <span><strong>${name}</strong></span><br />
                <a href="tel:${phone.replace(/\(0.*\)/, '+886')}">${phone}</a><br />
                <a href="https://www.google.com/maps?q=${address}">${address}</a><br />
            </address>
            <p>
                <span>成人口罩：${masksLeft}</span><br />
                <span>兒童口罩：${childMasksLeft}</span>
            </p>
            <p class="footnote">口罩數量以藥局實際存量為主，線上查詢之數量僅供參考。</p>
        `;
        marker.bindPopup(popup, { maxWidth: 260 });
        marker.on('click', (event) => {
            const { lat, lng } = event.latlng;
            setLastLocation([lat, lng]);
        });

        // Add the marker into cluster group
        markers.addLayer(marker);
    });

    // Add all markers to map
    map.addLayer(markers);
};

export default placeMarkers;
