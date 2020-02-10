import isObject from './isObject';

const getLastLocation = () => {
    try {
        // Parse string from localStorage
        const lastLocation = JSON.parse(localStorage.getItem('lastKnownLocation'));

        // Check if it's an object
        if (!isObject(lastLocation)) {
            throw new Error();
        }

        // Check if they're numbers
        const { longitude, latitude } = lastLocation;
        if ((typeof longitude !== 'number') || (typeof latitude !== 'number')) {
            throw new Error();
        }

        return lastLocation;
    } catch (error) {
        localStorage.removeItem('lastKnownLocation');
        return null;
    }
};

export default getLastLocation;
