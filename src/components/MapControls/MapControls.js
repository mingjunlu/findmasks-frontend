import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';
import LastLocation from '../../classes/LastLocation';
import { ReactComponent as LocateIcon } from '../../assets/locate.svg';
import { ReactComponent as PlusIcon } from '../../assets/plus.svg';
import { ReactComponent as MinusIcon } from '../../assets/minus.svg';
import ErrorScreen from '../ErrorScreen/ErrorScreen';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import mapProps from '../MaskMap/mapProps';
import styles from './MapControls.module.css';

const isProduction = (process.env.NODE_ENV === 'production');

const MapControls = ({ setMapCenter, setZoomLevel }) => {
    const history = useHistory();

    const [isLocating, setIsLocating] = useState(false);
    const [hasError, setHasError] = useState(false);

    const locateUser = async () => {
        history.push('/');
        setIsLocating(true);
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
    setMapCenter: PropTypes.func.isRequired,
    setZoomLevel: PropTypes.func.isRequired,
};

export default MapControls;
