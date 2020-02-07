const getLastLocation = () => {
    try {
        const lastLocation = JSON.parse(localStorage.getItem('lastKnownLocation'));
        if (!Array.isArray(lastLocation)) {
            throw new Error();
        }
        const areNumbers = lastLocation.every((value) => (typeof value === 'number'));
        if (!areNumbers) {
            throw new Error();
        }
        return lastLocation;
    } catch (error) {
        localStorage.removeItem('lastKnownLocation');
        return null;
    }
};

export default getLastLocation;
