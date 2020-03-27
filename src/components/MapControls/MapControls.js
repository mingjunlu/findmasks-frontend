import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import LastLocation from '../../classes/LastLocation';
import { ReactComponent as LocateIcon } from '../../assets/locate.svg';
import { ReactComponent as PlusIcon } from '../../assets/plus.svg';
import { ReactComponent as MinusIcon } from '../../assets/minus.svg';
import ErrorScreen from '../ErrorScreen/ErrorScreen';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import mapProps from '../MaskMap/mapProps';
import styles from './MapControls.module.css';

const MapControls = ({ setIsSheetVisible, setMapCenter, setZoomLevel }) => {
    const [isLocating, setIsLocating] = useState(false);
    const [hasError, setHasError] = useState(false);

    const locateUser = async () => {
        setIsSheetVisible(false);
        setIsLocating(true);
        let coordinates;

        ReactGA.event({
            category: 'MapControl',
            action: 'Clicked the locate button',
        });

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

        setIsLocating(false);
        if (coordinates) {
            const zoomLevelAfterLocated = 14;
            setZoomLevel(zoomLevelAfterLocated);
            setMapCenter(coordinates);
        }
    };

    const zoomIn = () => {
        setZoomLevel((prevState) => {
            const higherZoomLevel = prevState + 1;
            return (higherZoomLevel > mapProps.maxZoom)
                ? mapProps.maxZoom
                : higherZoomLevel;
        });
        ReactGA.event({
            category: 'MapControl',
            action: 'Clicked the zoom-in button',
        });
    };

    const zoomOut = () => {
        setZoomLevel((prevState) => {
            const lowerZoomLevel = prevState - 1;
            return (lowerZoomLevel < mapProps.minZoom)
                ? mapProps.minZoom
                : lowerZoomLevel;
        });
        ReactGA.event({
            category: 'MapControl',
            action: 'Clicked the zoom-out button',
        });
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
            {isLocating && <LoadingScreen />}
            <div className={`${styles.container} ${styles.topRight}`}>
                <button type="button" onClick={locateUser} className={styles.button}>
                    <LocateIcon className={styles.locateIcon} />
                </button>
            </div>
            <div className={`${styles.container} ${styles.bottomRight}`}>
                <button type="button" onClick={zoomIn} className={styles.button}>
                    <PlusIcon className={styles.plusIcon} />
                </button>
                <button type="button" onClick={zoomOut} className={styles.button}>
                    <MinusIcon className={styles.minusIcon} />
                </button>
            </div>
        </>
    );
};

MapControls.propTypes = {
    setIsSheetVisible: PropTypes.func.isRequired,
    setMapCenter: PropTypes.func.isRequired,
    setZoomLevel: PropTypes.func.isRequired,
};

export default MapControls;
