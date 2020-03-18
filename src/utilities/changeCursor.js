const changeCursor = (event) => {
    const map = event.target;
    switch (event.type) {
        case 'mouseenter': {
            map.getCanvas().style.setProperty('cursor', 'pointer');
            break;
        }
        case 'mouseleave': {
            map.getCanvas().style.removeProperty('cursor');
            break;
        }
        default: {
            map.getCanvas().style.removeProperty('cursor');
        }
    }
};

export default changeCursor;
