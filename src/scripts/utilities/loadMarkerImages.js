const loadMarkerImages = (specs) => {
    const promises = specs.map(({ id, color }) => (new Promise((resolve, reject) => {
        const image = new Image(16, 21);
        image.addEventListener('load', () => { resolve(image); });
        image.addEventListener('error', (error) => { reject(error); });
        image.id = id;
        image.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="${color}"><path d="M172.268 501.67C26.97 291.03 0 269.413 0 192 0 85.96 85.96 0 192 0s192 85.96 192 192c0 77.413-26.97 99.03-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/></svg>`;
    })));
    return promises;
};

export default loadMarkerImages;