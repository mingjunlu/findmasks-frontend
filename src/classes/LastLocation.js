import Cookies from 'js-cookie';
import mapProps from '../components/MaskMap/mapProps';

const isProduction = (process.env.NODE_ENV === 'production');
Cookies.defaults = {
    expires: 7, // days
    path: '/',
    sameSite: 'strict',
    secure: isProduction,
};

class LastLocation {
    constructor(coordinates) {
        const [longitude, latitude] = coordinates;
        this.longitude = longitude;
        this.latitude = latitude;
    }

    static restore() {
        try {
            // Check if the coordinates are numbers
            const longitude = Number(Cookies.get('longitude'));
            const latitude = Number(Cookies.get('latitude'));
            if (Number.isNaN(longitude) || Number.isNaN(latitude)) {
                throw new Error('Invalid coordinates');
            }

            // Check if the coordinates are within maxBounds
            const [[minLongitude, minLatitude], [maxLongitude, maxLatitude]] = mapProps.maxBounds;
            if ((longitude < minLongitude) || (longitude > maxLongitude)) {
                throw new Error('Longitude out of bounds');
            }
            if ((latitude < minLatitude) || (latitude > maxLatitude)) {
                throw new Error('Latitude out of bounds');
            }

            return [longitude, latitude];
        } catch (error) {
            // Remove invalid coordinates from cookie
            Cookies.remove('longitude', Cookies.defaults);
            Cookies.remove('latitude', Cookies.defaults);
            return null;
        }
    }

    save() {
        try {
            Cookies.set('longitude', this.longitude);
            Cookies.set('latitude', this.latitude);
            return true;
        } catch (error) {
            return false;
        }
    }
}

export default LastLocation;
