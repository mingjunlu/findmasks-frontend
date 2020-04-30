const colors = {
    sufficient: 'rgb(17, 120, 122)',
    acceptable: 'rgb(230, 126, 34)',
    insufficient: 'rgb(142, 142, 147)',
};

const icons = [
    { size: 40, category: 'pharmacy', status: 'sufficient' },
    { size: 40, category: 'pharmacy', status: 'acceptable' },
    { size: 40, category: 'pharmacy', status: 'insufficient' },
    { size: 40, category: 'health-center', status: 'sufficient' },
    { size: 40, category: 'health-center', status: 'acceptable' },
    { size: 40, category: 'health-center', status: 'insufficient' },
    { size: 80, category: 'pharmacy', status: 'sufficient' },
    { size: 80, category: 'pharmacy', status: 'acceptable' },
    { size: 80, category: 'pharmacy', status: 'insufficient' },
    { size: 80, category: 'health-center', status: 'sufficient' },
    { size: 80, category: 'health-center', status: 'acceptable' },
    { size: 80, category: 'health-center', status: 'insufficient' },
];

const generateImages = () => icons.map(({ size, category, status }) => {
    const image = new Image(size, size);

    if (category === 'pharmacy') {
        image.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200"><circle fill="${colors[status]}" r="48%" cx="50%" cy="50%" /><g transform="matrix(.178585 -.666489 .666489 .178585 92.955623 892.742207)" fill="rgb(250, 250, 255)"><svg viewBox="0 0 100 100"><path d="M33.34 39.4A15.11 15.11 0 0 0 13 45.69h0a15.11 15.11 0 0 0 6.27 20.36l18.93 10 14.07-26.62zm41.4 21.9l-18.93-10-14.08 26.62 18.93 10A15.1 15.1 0 0 0 81 81.66h0a15.09 15.09 0 0 0-6.26-20.35zm-7.2-18.05l-4.22-32.9a16.7 16.7 0 0 0 4.22 32.9zM84 24.42A16.71 16.71 0 0 0 67.28 9.84l4.2 32.9A16.71 16.71 0 0 0 84 24.42z"/></svg></g></svg>`;
    } else {
        image.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200"><circle fill="${colors[status]}" r="48%" cx="50%" cy="50%"/><g transform="matrix(.69 0 0 .69 186 186)" fill="rgb(250, 250, 255)"><svg viewBox="0 0 100 100"><path d="M86.677 6.686A5.73 5.73 0 0 0 82.61 5h-9.59a1.92 1.92 0 0 0-1.918 1.918v3.836a1.92 1.92 0 0 0 1.918 1.918h7.673v14.87c0 4.624-2.973 8.557-5.376 12.272-3.778 5.84-12.324 5.84-16.103.002-2.486-3.84-5.376-7.484-5.376-12.274v-14.87H61.5c1.06 0 1.918-.858 1.918-1.918V6.918A1.92 1.92 0 0 0 61.509 5h-9.59a5.74 5.74 0 0 0-4.069 1.686c-1.042 1.04-1.686 2.48-1.686 4.07V23.58c0 6.654 2.016 12.847 5.414 18.568 6.055 10.19 11.85 13.626 11.69 19.164-.105 3.552 0 7.113 0 10.67a15.37 15.37 0 0 1-15.346 15.346h-3.678a15.37 15.37 0 0 1-15.346-15.346V58.146c5.545-1.65 9.59-6.78 9.59-12.863 0-7.415-6.013-13.428-13.428-13.428a13.43 13.43 0 0 0-13.428 13.428c0 6.084 4.044 11.213 9.59 12.863V71.98C21.227 84.693 31.53 95 44.245 95h3.678c12.71 0 23.02-10.307 23.02-23.02v-6.208c0-2.93-.08-8.34 1.2-10.98 4.264-3.412 9.11-6.963 11.668-12.148 3.615-5.586 4.556-12.413 4.556-19.066V10.755c0-1.59-.646-3.027-1.688-4.07M17.87 45.283c0-3.964 3.228-7.193 7.193-7.193s7.193 3.23 7.193 7.193-3.23 7.193-7.193 7.193-7.193-3.227-7.193-7.193"/></svg></g></svg>`;
    }

    const id = `${category}-${size}--${status}`;
    return [id, image];
});

export default generateImages;
