import createClusters from './createClusters';
import placeMarkers from './placeMarkers';
import locateUser from './locateUser';

const initializeMap = async (promise, map) => {
    // Disable map rotation
    map.touchZoomRotate.disableRotation();
    map.dragRotate.disable();

    // Wait until data fetched
    const data = await promise;
    if (data instanceof Error) {
        // eslint-disable-next-line no-alert
        alert('無法取得資料');
        return;
    }

    // Load GeoJson data
    map.addSource('places', {
        type: 'geojson',
        data,
        cluster: true,
        clusterMaxZoom: 13,
        clusterRadius: 80,
    });

    // Create clusters & markers
    createClusters(map);
    placeMarkers(map);

    // Allow users to locate themselves
    const locateButton = document.querySelector('.controls__icon--locate').parentElement;
    locateButton.addEventListener('click', async (event) => {
        event.target.setAttribute('disabled', true);
        await locateUser(map);
        event.target.removeAttribute('disabled');
    });

    // Select elements related to reporting issues
    const reportButton = document.querySelector('.controls__icon--report').parentElement;
    const issueLayer = document.querySelector('.issues-layer');
    const issueHeading = document.querySelector('.issues__heading');
    const reportingForm = document.querySelector('.issues');
    const firstPage = document.querySelector('.issues__page');
    const cancelButton = document.querySelector('.issues__button');
    const submitButton = document.querySelector('.issues__button--bold');
    const touchables = document.querySelectorAll('.issues__touchable');
    const inputs = document.querySelectorAll('.issues__input');
    const hiddenInput = document.querySelector('input[type=hidden]');

    const quitReporting = () => {
        issueLayer.classList.add('issues-layer--vanished');
        firstPage.classList.remove('issues__page--vanished');
        submitButton.setAttribute('disabled', true);
        inputs.forEach((input) => {
            // eslint-disable-next-line no-param-reassign
            input.value = '';
            hiddenInput.removeAttribute('value');
            issueHeading.textContent = '回報問題';
        });
    };

    // Submit the form
    reportingForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const encode = (obj) => Object.keys(obj)
            .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
            .join('&');
        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: encode({
                    'form-name': 'issue',
                    type: hiddenInput.value.trim(),
                    description: inputs[0].value.trim(),
                    email: inputs[1].value.trim(),
                }),
            });
            if (!response.ok) { throw new Error(); }
            // eslint-disable-next-line no-alert
            alert('訊息已送出');
        } catch (error) {
            // eslint-disable-next-line no-alert
            alert('無法送出訊息');
        }
        quitReporting();
    });

    // Enable or disable the submit button depending on the input value
    inputs[0].addEventListener('input', (event) => {
        const value = event.target.value.trim();
        if (value) {
            submitButton.removeAttribute('disabled');
        } else {
            submitButton.setAttribute('disabled', true);
        }
    });

    // Allow users to quit reporting
    cancelButton.addEventListener('click', quitReporting);

    // Show the issue reporting layer
    reportButton.addEventListener('click', () => {
        issueLayer.classList.remove('issues-layer--vanished');
    });

    // Set issue type
    touchables.forEach((touchable) => {
        touchable.addEventListener('click', () => {
            hiddenInput.value = touchable.dataset.issue;
            issueHeading.textContent = touchable.children[1].firstElementChild.textContent;
            firstPage.classList.add('issues__page--vanished');
            submitButton.classList.remove('issues__button--hidden');
        });
    });

    // Show control buttons
    const controlsDiv = document.querySelector('.controls');
    controlsDiv.classList.remove('controls--invisible');

    // Change labels to Traditional Chinese
    map.getStyle().layers.forEach((layer) => {
        if (layer.id.endsWith('-label')) {
            map.setLayoutProperty(layer.id, 'text-field', [
                'coalesce',
                ['get', 'name_zh-Hant'],
                ['get', 'name'],
            ]);
        }
    });
};

export default initializeMap;
