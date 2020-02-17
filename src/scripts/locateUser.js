import getPosition from './getPosition';

const locateUser = async (map) => {
    // Set loading styles
    const mapContainer = document.querySelector('#map');
    const controlsDiv = document.querySelector('.controls');
    mapContainer.classList.add('disabled');
    controlsDiv.classList.add('disabled');

    // Get coordinates
    let coordinates = [];
    try {
        coordinates = await getPosition();
        const hasCoordinates = (coordinates.length === 2);
        const areNumbers = coordinates.every((item) => (typeof item === 'number'));
        if (!hasCoordinates || !areNumbers) {
            throw new Error();
        }
    } catch (error) {
        // eslint-disable-next-line no-alert
        alert('定位失敗');
        return;
    }

    // Remove loading styles
    mapContainer.classList.remove('disabled');
    controlsDiv.classList.remove('disabled');

    map.flyTo({ center: coordinates, zoom: 14 });
};

export default locateUser;
