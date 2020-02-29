const setLastLocation = ({ longitude, latitude }) => {
    if (longitude && latitude) {
        localStorage.setItem('lastKnownLocation', JSON.stringify({ longitude, latitude }));
    }
};

export default setLastLocation;
