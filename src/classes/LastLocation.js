class LastLocation {
    constructor(coordinates) {
        const [longitude, latitude] = coordinates;
        this.longitude = longitude;
        this.latitude = latitude;
    }

    static restore() {
        try {
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
