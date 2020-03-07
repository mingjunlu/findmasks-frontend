import 'tocca';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw';
import relativeTime from 'dayjs/plugin/relativeTime';
import weekday from 'dayjs/plugin/weekday';
import getClassSufix from '../utilities/getClassSufix';
import fetchData from '../utilities/fetchData';

dayjs.locale('zh-tw');
dayjs.extend(relativeTime);
dayjs.extend(weekday);
window.tocca({
    justTouchEvents: true,
    swipeThreshold: 50,
    useJquery: false,
});

const Sheet = class {
    constructor(elementId) {
        const element = document.getElementById(elementId);
        if (!element) { throw new Error('Must provide an element ID'); }

        this.isVisible = false;
        this.isCondensed = true;
        this.data = {
            id: undefined,
            name: undefined,
            phone: undefined,
            address: undefined,
            masksLeft: undefined,
            childMasksLeft: undefined,
            opensOn: undefined,
            note: undefined,
            updatedAt: undefined,
        };

        this.container = element;
        this.container.className = 'sheet sheet--condensed sheet--vanished';
        this.container.innerHTML = `
            <div class="sheet__heading">
                <div class="sheet__title">
                    <h1 class="sheet__name"></h1>
                    <p class="sheet__time"></p>
                </div>
                <div class="sheet__buttons">
                    <button type="button" class="sheet__button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" class="sheet__icon--cancel">
                            <path fill="rgb(142, 142, 147)" d="M242.72 256L342.8 155.93c12.28-12.28 12.28-32.2 0-44.48L320.55 89.2c-12.28-12.28-32.2-12.28-44.48 0L176 189.28 75.93 89.2c-12.28-12.28-32.2-12.28-44.48 0L9.2 111.45c-12.28 12.28-12.28 32.2 0 44.48L109.28 256 9.2 356.07c-12.28 12.28-12.28 32.2 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72 276.07 422.8c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.2 0-44.48L242.72 256z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="sheet__cards">
                <p class="sheet__card">
                    <span class="sheet__card-label">成人口罩</span>
                    <span class="sheet__card-value"></span>
                </p>
                <p class="sheet__card">
                    <span class="sheet__card-label">兒童口罩</span>
                    <span class="sheet__card-value"></span>
                </p>
            </div>
            <div class="sheet__details">
                <a class="sheet__touchable">
                    <span class="sheet__label">地址</span>
                    <span class="sheet__value sheet__value--highlighted sheet__value--long"></span>
                </a>
                <a class="sheet__touchable">
                    <span class="sheet__label">電話</span>
                    <span class="sheet__value sheet__value--highlighted sheet__value--short"></span>
                </a>
                <p class="sheet__touchable">
                    <span class="sheet__label">備註</span>
                    <span class="sheet__value sheet__value--short"></span>
                </p>
                <div class="sheet__touchable">
                    <p class="sheet__label">營業時段</p>
                    <p class="sheet__value sheet__value--nested sheet__value--bold">
                        <span></span>
                        <span></span>
                    </p>
                    <p class="sheet__value sheet__value--nested">
                        <span></span>
                        <span></span>
                    </p>
                    <p class="sheet__value sheet__value--nested">
                        <span></span>
                        <span></span>
                    </p>
                    <p class="sheet__value sheet__value--nested">
                        <span></span>
                        <span></span>
                    </p>
                    <p class="sheet__value sheet__value--nested">
                        <span></span>
                        <span></span>
                    </p>
                    <p class="sheet__value sheet__value--nested">
                        <span></span>
                        <span></span>
                    </p>
                    <p class="sheet__value sheet__value--nested">
                        <span></span>
                        <span></span>
                    </p>
                </div>
            </div>
        `;

        // Hide the sheet after the close button is clicked
        const closeButton = this.container.firstElementChild.lastElementChild.lastElementChild;
        closeButton.addEventListener('click', () => { this.hide(); });

        // Detect swipe-up & swipe-down gestures
        this.container.addEventListener('swipeup', () => {
            if (this.isCondensed) { this.expand(); }
        });
        this.container.addEventListener('swipedown', (event) => {
            if (this.isCondensed) {
                this.hide();
            } else if (event.distance.y > 110) {
                this.show();
            }
        });
    }

    render() {
        const [
            sheetHeading,
            sheetCards,
            sheetDetails,
        ] = this.container.children;
        const [placeName, updateTime] = sheetHeading.firstElementChild.children;

        // Update the container's className
        this.container.className = this.isVisible
            ? 'sheet sheet--condensed'
            : 'sheet sheet--condensed sheet--vanished';
        if (!this.isCondensed) {
            this.container.classList.remove('sheet--condensed');
        }

        // Update the place's name
        placeName.textContent = this.data.name;

        // Update the update time
        if (!this.data.updatedAt) {
            updateTime.textContent = '';
        } else if (this.data.updatedAt) {
            const sixtyFiveSeconds = 65;
            const isUpToDate = (dayjs().diff(dayjs(this.data.updatedAt), 'second') < sixtyFiveSeconds);
            updateTime.textContent = isUpToDate ? '剛剛' : dayjs(this.data.updatedAt).fromNow();
        }

        // Update address and add hyperlinks to Google Maps
        const mapLink = this.data.address
            ? `https://www.google.com/maps/dir/current+location/${this.data.address}`
            : '';
        sheetDetails.children[0].setAttribute('href', mapLink);
        sheetDetails.children[0].lastElementChild.textContent = this.data.address || '';

        // Update the phone number
        const phoneLink = this.data.phone
            ? `tel:${this.data.phone.replace(/\(0.*\)/, '+886')}`
            : '';
        sheetDetails.children[1].setAttribute('href', phoneLink);
        sheetDetails.children[1].lastElementChild.textContent = this.data.phone || '';

        // Update the note
        sheetDetails.children[2].lastElementChild.textContent = this.data.note || '';
        if (this.data.note) {
            sheetDetails.children[2].classList.remove('sheet__touchable--vanished');
        } else {
            sheetDetails.children[2].classList.add('sheet__touchable--vanished');
        }

        // Update the opening hours
        if (Array.isArray(this.data.opensOn) && (this.data.opensOn.length > 0)) {
            sheetDetails.children[3].classList.remove('sheet__touchable--vanished');
        } else {
            sheetDetails.children[3].classList.add('sheet__touchable--vanished');
        }
        [...sheetDetails.children[3].children].slice(1).forEach((element, index) => {
            const dayOfWeek = dayjs().add(index, 'day');
            /* eslint-disable no-param-reassign */
            element.firstElementChild.textContent = dayOfWeek.format('dddd');
            element.lastElementChild.textContent = this.data.opensOn
                ? this.data.opensOn[dayOfWeek.day()]
                : '';
            /* eslint-enable no-param-reassign */
        });

        // Update the masksLeft value and determine its color
        sheetCards.firstElementChild.lastElementChild.textContent = this.data.masksLeft;
        sheetCards.firstElementChild.className = getClassSufix(this.data.masksLeft, 400, 'sheet__card');

        // Update the childMasksLeft value and determine its color
        sheetCards.lastElementChild.lastElementChild.textContent = this.data.childMasksLeft;
        sheetCards.lastElementChild.className = getClassSufix(this.data.childMasksLeft, 200, 'sheet__card');
    }

    show() {
        this.isVisible = true;
        this.isCondensed = true;
        this.render();
    }

    hide() {
        this.isVisible = false;
        this.render();
    }

    expand() {
        this.isVisible = true;
        this.isCondensed = false;
        this.render();
    }

    update(props) {
        this.data = props;
    }

    async loadData() {
        const feature = await fetchData(`/${this.data.id}`);
        this.update(feature.properties);
        this.render();
    }
};

export default Sheet;
