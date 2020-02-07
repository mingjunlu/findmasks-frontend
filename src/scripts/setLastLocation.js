const setLastLocation = (coordinates) => {
    if (Array.isArray(coordinates)) {
        localStorage.setItem('lastKnownLocation', JSON.stringify(coordinates));
    }
};

export default setLastLocation;
