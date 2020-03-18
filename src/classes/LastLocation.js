class LastLocation {
    constructor(coordinates) {
        const [longitude, latitude] = coordinates;
        this.longitude = longitude;
        this.latitude = latitude;
    }

    static restore() {
        try {
            // Clear the old value
            const hasOldValue = !!localStorage.getItem('lastKnownLocation');
            if (hasOldValue) { localStorage.removeItem('lastKnownLocation'); }

            const { longitude, latitude } = JSON.parse(localStorage.getItem('lastLocation'));
            return [longitude, latitude];
        } catch (error) {
            return null;
        }
    }

    save() {
        let isSuccess;

        try {
            localStorage.setItem('lastLocation', JSON.stringify({
                longitude: this.longitude,
                latitude: this.latitude,
            }));
            isSuccess = true;
        } catch (error) {
            isSuccess = false;
        }

        return isSuccess;
    }
}

export default LastLocation;
