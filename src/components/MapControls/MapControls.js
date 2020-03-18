import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { ReactComponent as LocateIcon } from '../../assets/locate.svg';
import styles from './MapControls.module.css';
import ErrorScreen from '../ErrorScreen/ErrorScreen';

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
                    resolve([longitude, latitude]);
                };
                const positionOptions = { enableHighAccuracy: true, timeout: 4000 };
                navigator.geolocation.getCurrentPosition(onSuccess, onError, positionOptions);
            });
        } catch (error) {
            setHasError(true);
        }

        setIsLocating(false);
        if (coordinates) {
            const higherZoomLevel = 14;
            setZoomLevel(higherZoomLevel);
            setMapCenter(coordinates);
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
            {isLocating && <LoadingScreen />}
            <div className={`${styles.container} ${styles.topRight}`}>
                <button type="button" onClick={locateUser} className={styles.button}>
                    <LocateIcon className={styles.locateIcon} />
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
