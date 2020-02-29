import getPosition from './getPosition';

const locateUser = async (map) => {
    // Set loading styles
    const locatingScreen = document.querySelector('.locating-layer');
    if (locatingScreen) {
        locatingScreen.classList.remove('locating-layer--vanished');
    }

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
    if (locatingScreen) {
        locatingScreen.classList.add('locating-layer--vanished');
    }

    map.flyTo({ center: coordinates, zoom: 14 });
};

export default locateUser;
