const generateIcon = (options = {}) => {
    const {
        width = 40,
        height = 40,
        color = 'rgb(255, 255, 255)',
        backgroundColor = 'rgb(28, 28, 30)',
    } = options;

    const icon = new Image(width, height);
    icon.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200"><circle fill="${backgroundColor}" r="48%" cx="50%" cy="50%" /><g transform="matrix(.178585 -.666489 .666489 .178585 92.955623 892.742207)" fill="${color}"><svg viewBox="0 0 100 100"><path d="M33.34 39.4A15.11 15.11 0 0 0 13 45.69h0a15.11 15.11 0 0 0 6.27 20.36l18.93 10 14.07-26.62zm41.4 21.9l-18.93-10-14.08 26.62 18.93 10A15.1 15.1 0 0 0 81 81.66h0a15.09 15.09 0 0 0-6.26-20.35zm-7.2-18.05l-4.22-32.9a16.7 16.7 0 0 0 4.22 32.9zM84 24.42A16.71 16.71 0 0 0 67.28 9.84l4.2 32.9A16.71 16.71 0 0 0 84 24.42z"/></svg></g></svg>`;

    return icon;
};

export default generateIcon;
