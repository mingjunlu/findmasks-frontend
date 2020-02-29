import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw';
import relativeTime from 'dayjs/plugin/relativeTime';
import getClassSufix from '../utilities/getClassSufix';

dayjs.locale('zh-tw');
dayjs.extend(relativeTime);

const Sheet = class {
    constructor(elementId) {
        const element = document.getElementById(elementId);
        if (!element) { throw new Error('Must provide an element ID'); }

        this.isVisible = false;
        this.data = {
            id: undefined,
            name: undefined,
            phone: undefined,
            address: undefined,
            masksLeft: undefined,
            childMasksLeft: undefined,
            updatedAt: undefined,
        };

        this.container = element;
        this.container.className = 'sheet sheet--vanished';
        this.container.innerHTML = `
            <div class="sheet__heading">
                <div class="sheet__title">
                    <h1 class="sheet__name"></h1>
                    <p class="sheet__time"></p>
                </div>
                <div class="sheet__buttons">
                    <a class="sheet__button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="sheet__icon--phone">
                            <path fill="rgb(142, 142, 147)" d="M497.4 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" />
                        </svg>
                    </a>
                    <a class="sheet__button">
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
                <p class="sheet__masksLeft">
                    <span class="sheet__label">成人口罩</span>
                    <span class="sheet__value"></span>
                </p>
                <p class="sheet__masksLeft">
                    <span class="sheet__label">兒童口罩</span>
                    <span class="sheet__value"></span>
                </p>
            </div>
            <a class="sheet__segment"></a>
            <a class="sheet__segment"></a>
        `;

        // Hide the sheet after the close button is clicked
        const closeButton = this.container.firstElementChild.lastElementChild.lastElementChild;
        closeButton.addEventListener('click', () => { this.hide(); });
    }

    render() {
        const [
            sheetHeading,
            sheetMasks,
            desktopAddress,
            desktopPhoneNumber,
        ] = this.container.children;
        const [placeName, updateTime] = sheetHeading.firstElementChild.children;
        const [dialButton, navigateButton] = sheetHeading.lastElementChild.children;

        // Update the container's className
        this.container.className = this.isVisible ? 'sheet' : 'sheet sheet--vanished';

        // Update the place's name
        placeName.textContent = this.data.name;

        // Update the update time
        updateTime.textContent = dayjs(this.data.updatedAt).fromNow();

        // Update the phone number
        dialButton.setAttribute('href', `tel:${this.data.phone.replace(/\(0.*\)/, '+886')}`);
        desktopPhoneNumber.textContent = this.data.phone;

        // Update address and add hyperlinks to Google Maps
        const googleMapsLink = `https://www.google.com/maps/dir/current+location/${this.data.address}`;
        navigateButton.setAttribute('href', googleMapsLink);
        desktopAddress.setAttribute('href', googleMapsLink);
        desktopAddress.textContent = this.data.address;

        // Update the masksLeft value and determine its color
        sheetMasks.firstElementChild.lastElementChild.textContent = this.data.masksLeft;
        sheetMasks.firstElementChild.className = getClassSufix(this.data.masksLeft, 400);

        // Update the childMasksLeft value and determine its color
        sheetMasks.lastElementChild.lastElementChild.textContent = this.data.childMasksLeft;
        sheetMasks.lastElementChild.className = getClassSufix(this.data.childMasksLeft, 200);
    }

    show() {
        this.isVisible = true;
        this.render();
    }

    hide() {
        this.isVisible = false;
        this.render();
    }

    update(props) {
        this.data = props;
    }
};

export default Sheet;
