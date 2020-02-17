const getPosition = () => new Promise((resolve, reject) => {
    const onError = (error) => { reject(error); };
    const onSuccess = (position) => {
        const { latitude, longitude } = position.coords;
        resolve([longitude, latitude]);
    };
    const positionOptions = { enableHighAccuracy: true, timeout: 5000 };
    navigator.geolocation.getCurrentPosition(onSuccess, onError, positionOptions);
});

export default getPosition;
