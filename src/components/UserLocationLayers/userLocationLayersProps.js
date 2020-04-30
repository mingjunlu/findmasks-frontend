const userLocationProps = {
    id: 'user-location',
    type: 'circle',
    sourceId: 'user-location',
    paint: {
        'circle-radius': 8,
        'circle-color': 'rgb(0, 122, 255)',
        'circle-stroke-width': 3.5,
        'circle-stroke-color': 'white',
    },
};

const userLocationRadiusProps = {
    id: 'user-location-radius',
    type: 'circle',
    sourceId: 'user-location',
    paint: {
        'circle-color': 'rgba(0, 122, 255, 0.1)',
    },
};

export { userLocationProps, userLocationRadiusProps };
