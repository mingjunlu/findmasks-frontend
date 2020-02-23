import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-tw';
import getClassSufix from './getClassSufix';
import setLastLocation from './setLastLocation';

dayjs.extend(relativeTime);
dayjs.locale('zh-tw');

const placeMarkers = async (map, time) => {
    // Load marker images
    const promisedMarkers = [
        new Promise((resolve, reject) => {
            const image = new Image(16, 21);
            image.addEventListener('load', () => { resolve(image); });
            image.addEventListener('error', (error) => { reject(error); });
            image.src = '/marker-insufficient.svg';
        }),
        new Promise((resolve, reject) => {
            const image = new Image(16, 21);
            image.addEventListener('load', () => { resolve(image); });
            image.addEventListener('error', (error) => { reject(error); });
            image.src = '/marker-caution.svg';
        }),
        new Promise((resolve, reject) => {
            const image = new Image(16, 21);
            image.addEventListener('load', () => { resolve(image); });
            image.addEventListener('error', (error) => { reject(error); });
            image.src = '/marker-sufficient.svg';
        }),
    ];
    const results = await Promise.allSettled(promisedMarkers);
    const markers = results.map((promise) => promise.value);
    map.addImage('insufficient-marker', markers[0]);
    map.addImage('caution-marker', markers[1]);
    map.addImage('sufficient-marker', markers[2]);

    // Paint the marker
    map.addLayer({
        id: 'unclustered-point',
        type: 'symbol',
        source: 'places',
        filter: ['!', ['has', 'point_count']],
        layout: {
            'icon-allow-overlap': false,
            'text-field': '{name}',
            'text-size': 12,
            'text-letter-spacing': 0.05,
            'text-offset': [0, 1.6],
            'icon-image': [
                'step',
                ['get', 'masksLeft'],
                'insufficient-marker',
                20,
                'caution-marker',
                100,
                'sufficient-marker',
            ],
        },
        paint: {
            'text-halo-color': 'rgb(255, 255, 255)',
            'text-halo-width': 1,
            'text-color': [
                'step',
                ['get', 'masksLeft'],
                'rgb(142, 142, 147)',
                20,
                'rgb(230, 126, 34)',
                100,
                'rgb(17, 120, 122)',
            ],
        },
    });

    const sheet = document.querySelector('.sheet');
    sheet.removeAttribute('style');

    // Show place info on click
    map.on('click', 'unclustered-point', (event) => {
        const [feature] = event.features;
        const { geometry, properties } = feature;

        // Update the last known location
        setLastLocation({
            longitude: geometry.coordinates[0],
            latitude: geometry.coordinates[1],
        });

        // Calculate the relative time
        const updateTime = time ? dayjs(time).fromNow() : '';

        sheet.innerHTML = `
            <div class="sheet__heading">
                <div class="sheet__title">
                    <h1 class="sheet__name">${properties.name}</h1>
                    <p class="sheet__time">${updateTime}</p>
                </div>
                <div class="sheet__buttons">
                    <a href="tel:${properties.phone.replace(/\(0.*\)/, '+886')}" class="sheet__button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="sheet__icon--phone">
                            <path fill="rgb(142, 142, 147)" d="M497.4 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" />
                        </svg>
                    </a>
                    <a href="https://www.google.com/maps/dir/current+location/${properties.address}" class="sheet__button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="sheet__icon--direction">
                            <path fill="rgb(142, 142, 147)" d="M502.61 233.32L278.68 9.39c-12.52-12.52-32.83-12.52-45.36 0L9.39 233.32c-12.52 12.53-12.52 32.83 0 45.36l223.93 223.93c12.52 12.53 32.83 12.53 45.36 0l223.93-223.93c12.52-12.53 12.52-32.83 0-45.36zm-100.98 12.56l-84.21 77.73c-5.12 4.73-13.43 1.1-13.43-5.88V264h-96v64c0 4.42-3.58 8-8 8h-32c-4.42 0-8-3.58-8-8v-80c0-17.67 14.33-32 32-32h112v-53.73c0-6.97 8.3-10.61 13.43-5.88l84.21 77.73c3.43 3.17 3.43 8.59 0 11.76z" />
                        </svg>
                    </a>
                    <button type="button" class="sheet__button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" class="sheet__icon--cancel">
                            <path fill="rgb(142, 142, 147)" d="M242.72 256L342.8 155.93c12.28-12.28 12.28-32.2 0-44.48L320.55 89.2c-12.28-12.28-32.2-12.28-44.48 0L176 189.28 75.93 89.2c-12.28-12.28-32.2-12.28-44.48 0L9.2 111.45c-12.28 12.28-12.28 32.2 0 44.48L109.28 256 9.2 356.07c-12.28 12.28-12.28 32.2 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72 276.07 422.8c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.2 0-44.48L242.72 256z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="sheet__masks">
                <p class="${getClassSufix(properties.masksLeft, 400)}">
                    <span class="sheet__label">成人口罩</span>
                    <span class="sheet__value">${properties.masksLeft}</span>
                </p>
                <p class="${getClassSufix(properties.childMasksLeft, 200)}">
                    <span class="sheet__label">兒童口罩</span>
                    <span class="sheet__value">${properties.childMasksLeft}</span>
                </p>
            </div>
            <a href="https://www.google.com/maps/dir/current+location/${properties.address}" class="sheet__segment">
                ${properties.address}
            </a>
            <a href="tel:${properties.phone.replace(/\(0.*\)/, '+886')}" class="sheet__segment">
                ${properties.phone}
            </a>
        `;

        // Hide the sheet after the close button is clicked
        const closeButton = document.querySelector('button.sheet__button');
        closeButton.addEventListener('click', () => { sheet.classList.add('sheet--vanished'); });

        // Show the place's info
        sheet.classList.remove('sheet--vanished');
    });

    // Hide the sheet when clicked elsewhere
    // map.on('touchend', () => { sheet.classList.add('sheet--vanished'); });

    // Change the cursor on hover & blur
    map.on('mouseenter', 'unclustered-point', () => {
        map.getCanvas().style.setProperty('cursor', 'pointer');
    });
    map.on('mouseleave', 'unclustered-point', () => {
        map.getCanvas().style.removeProperty('cursor');
    });
};

export default placeMarkers;
