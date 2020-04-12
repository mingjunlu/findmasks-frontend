import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';
import fetchData from '../../utilities/fetchData';
import generateNumber from '../../utilities/generateNumber';
import LastLocation from '../../classes/LastLocation';
import { ReactComponent as RefreshIcon } from '../../assets/refresh.svg';
import { ReactComponent as LocateIcon } from '../../assets/locate.svg';
import { ReactComponent as PlusIcon } from '../../assets/plus.svg';
import { ReactComponent as MinusIcon } from '../../assets/minus.svg';
import ErrorScreen from '../ErrorScreen/ErrorScreen';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import mapProps from '../MaskMap/mapProps';
import styles from './MapControls.module.css';

const isProduction = (process.env.NODE_ENV === 'production');

const MapControls = ({ setFeatures, setMapCenter, setZoomLevel }) => {
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const locateUser = async () => {
        history.push('/');
        setIsLoading(true);
        let coordinates;

        if (isProduction) {
            ReactGA.event({
                category: 'MapControl',
                action: 'Clicked the locate button',
            });
        }

        try {
            coordinates = await new Promise((resolve, reject) => {
                const onError = (error) => { reject(error); };
                const onSuccess = (position) => {
                    const { latitude, longitude } = position.coords;
                    const here = [longitude, latitude];
                    const newLocation = new LastLocation(here);
                    newLocation.save(); // Update the last location
                    resolve(here);
                };
                const positionOptions = { enableHighAccuracy: true, timeout: 6000 };
                navigator.geolocation.getCurrentPosition(onSuccess, onError, positionOptions);
            });
        } catch (error) {
            setHasError(true);
        }

        setIsLoading(false);
        if (coordinates) {
            const zoomLevelAfterLocated = 14;
            setZoomLevel(zoomLevelAfterLocated);
            setMapCenter(coordinates);
        }
    };

    const updateFeatures = async () => {
        const startTime = Date.now();
        history.push('/');
        setIsLoading(true);

        if (isProduction) {
            ReactGA.event({
                category: 'MapControl',
                action: 'Clicked the refresh button',
            });
        }

        const collection = await fetchData(process.env.REACT_APP_ENDPOINT);

        // Add a delay to make it more "realistic"
        await new Promise((resolve) => {
            const requestTime = Date.now() - startTime;
            const idealLoadingTime = generateNumber(500, 800);
            const delay = (requestTime < idealLoadingTime) ? (idealLoadingTime - requestTime) : 0;
            setTimeout(resolve, delay);
        });

        setFeatures(collection instanceof Error ? collection : collection.features);
        setIsLoading(false);
    };

    const zoomIn = () => {
        setZoomLevel((prevState) => {
            const higherZoomLevel = prevState + 1;
            return (higherZoomLevel > mapProps.maxZoom)
                ? mapProps.maxZoom
                : higherZoomLevel;
        });
        if (isProduction) {
            ReactGA.event({
                category: 'MapControl',
                action: 'Clicked the zoom-in button',
            });
        }
    };

    const zoomOut = () => {
        setZoomLevel((prevState) => {
            const lowerZoomLevel = prevState - 1;
            return (lowerZoomLevel < mapProps.minZoom)
                ? mapProps.minZoom
                : lowerZoomLevel;
        });
        if (isProduction) {
            ReactGA.event({
                category: 'MapControl',
                action: 'Clicked the zoom-out button',
            });
        }
    };

    if (hasError) {
        const removeErrorScreen = () => { setHasError(false); };
        return (
            <ErrorScreen
                isCloseable
                onClick={removeErrorScreen}
                message="定位失敗"
            />
        );
    }

    return (
        <>
            {isLoading && <LoadingScreen message="定位中" />}
            <div className={`${styles.container} ${styles.topRight}`}>
                <button type="button" onClick={locateUser} className={styles.button}>
                    <LocateIcon className={styles.locateIcon} />
                </button>
            </div>
            <div className={`${styles.container} ${styles.bottomRight} ${styles.containerForDesktop}`}>
                <button type="button" onClick={updateFeatures} className={styles.button}>
                    <RefreshIcon className={styles.refreshIcon} />
                </button>
            </div>
            <div className={`${styles.container} ${styles.bottomRight}`}>
                <button
                    className={`${styles.button} ${styles.buttonForDesktop}`}
                    onClick={zoomIn}
                    type="button"
                >
                    <PlusIcon className={styles.plusIcon} />
                </button>
                <button
                    className={`${styles.button} ${styles.buttonForDesktop}`}
                    onClick={zoomOut}
                    type="button"
                >
                    <MinusIcon className={styles.minusIcon} />
                </button>
            </div>
        </>
    );
};

MapControls.propTypes = {
    setFeatures: PropTypes.func.isRequired,
    setMapCenter: PropTypes.func.isRequired,
    setZoomLevel: PropTypes.func.isRequired,
};

export default MapControls;
