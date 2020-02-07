const locateUser = (element, map) => {
    const { button } = element;
    const { _container: mapDiv } = map;

    // Set loading styles
    button.setAttribute('disabled', true);
    map.dragging.disable();
    mapDiv.style.setProperty('filter', 'brightness(50%)');

    // Remove loading styles after locating completed/failed
    map.on('locationfound', () => {
        button.removeAttribute('disabled');
        map.dragging.enable();
        mapDiv.style.removeProperty('filter');
    });
    map.on('locationerror', () => {
        // eslint-disable-next-line no-alert
        alert('定位失敗');
        button.removeAttribute('disabled');
        map.dragging.enable();
        mapDiv.style.removeProperty('filter');
    });

    // Zoom in to current location
    map.locate({ setView: true, maxZoom: 16 });
};

export default locateUser;
