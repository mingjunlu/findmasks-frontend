import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import ReactGA from 'react-ga';
import fetchData from '../../utilities/fetchData';
import LastLocation from '../../classes/LastLocation';
import ErrorScreen from '../ErrorScreen/ErrorScreen';
import FullScreenOverlay from '../FullScreenOverlay/FullScreenOverlay';
import PlaceInfoHeader from '../PlaceInfoHeader/PlaceInfoHeader';
import PlaceInfoBody from '../PlaceInfoBody/PlaceInfoBody';
import styles from './PlaceInfo.module.css';

const isProduction = (process.env.NODE_ENV === 'production');

const PlaceInfo = ({ setMapCenter, setZoomLevel }) => {
    const { id } = useParams();
    const { pathname, state: locationState } = useLocation();
    const history = useHistory();
    const isTabletOrDesktop = useMediaQuery({ query: '(min-width: 640px)' });

    const [isScrollable, setIsScrollable] = useState(false);
    const [error, setError] = useState(null);
    const [coordinates, setCoordinates] = useState([]);
    const [place, setPlace] = useState({
        id: '',
        name: (locationState && locationState.placeName) || '',
        phone: '',
        address: '',
        masksLeft: NaN,
        childMasksLeft: NaN,
        opensOn: [],
        note: '',
        updatedAt: '',
    });

    // Get the place's info
    useEffect(() => {
        let isMounted = true;
        const getFeature = async () => {
            const feature = await fetchData(`${process.env.REACT_APP_ENDPOINT}/${id}`);
            if (isMounted && (feature instanceof Error)) {
                setError(feature);
            } else if (isMounted && !(feature instanceof Error)) {
                setCoordinates(feature.geometry.coordinates);
                setPlace(feature.properties);
            }
        };
        getFeature();
        return () => { isMounted = false; }; // Prevent setting state after unmounted
    }, [id]);

    // Update the page title
    useEffect(() => {
        const originalTitle = document.title;
        if (place.name) { document.title = `${place.name} | 口罩咧？`; }
        return () => { document.title = originalTitle; };
    }, [place.name, pathname]);

    // Set the map center and update last location
    useEffect(() => {
        const hasPlaceName = (locationState && locationState.placeName);
        const hasCoordinates = (coordinates.length > 0);
        if (hasPlaceName || !hasCoordinates) { return; }

        const higherZoomLevel = 16;
        setZoomLevel(higherZoomLevel);
        setMapCenter(coordinates);

        const newLocation = new LastLocation(coordinates);
        newLocation.save();
    }, [coordinates, locationState, setMapCenter, setZoomLevel]);


    const topBoundary = 32;
    const initialPosition = Math.round(window.innerHeight * 0.6);
    const [position, setPosition] = useState(initialPosition);
    const [startPosition, setStartPosition] = useState(null);

    const updateStartPosition = (event) => {
        const newPosition = Math.round(event.touches[0].clientY);
        setStartPosition(newPosition);
    };

    const dragInfo = (event) => {
        const newPosition = Math.round(event.touches[0].clientY);
        setPosition((newPosition < topBoundary) ? topBoundary : newPosition);
    };

    const dropInfo = (event) => {
        const newPosition = Math.round(event.changedTouches[0].clientY);

        const threshold = 40;
        const movement = Math.abs(newPosition - startPosition);
        if (movement < threshold) { return; }

        const hasSwipedUp = (newPosition <= startPosition);
        const shouldMinimize = (startPosition >= initialPosition);

        if (hasSwipedUp) {
            setPosition(topBoundary);
            setIsScrollable(true);
            if (isProduction) {
                ReactGA.event({
                    category: 'PlaceInfo',
                    action: 'Swiped up to expand',
                });
            }
        } else if (shouldMinimize) {
            setPosition(Math.round(window.innerHeight * 1.1));
            setTimeout(() => { history.push('/'); }, 100);
            if (isProduction) {
                ReactGA.event({
                    category: 'PlaceInfo',
                    action: 'Swiped down to minimize',
                });
            }
        }
    };

    if (error) {
        const goToHomepage = () => { history.push('/'); };
        return <ErrorScreen isCloseable onClick={goToHomepage} message="無法取得資料" />;
    }

    const overlayColor = (!isTabletOrDesktop && isScrollable) ? undefined : 'transparent';
    const pointerEvents = (!isTabletOrDesktop && isScrollable) ? null : 'none';
    const mobileContainerStyle = {
        transform: `translateY(${position}px)`,
        willChange: 'transform',
    };

    return (
        <FullScreenOverlay backgroundColor={overlayColor} pointerEvents={pointerEvents} zIndex={4}>
            <article
                className={styles.container}
                onTouchEnd={(!isTabletOrDesktop && isScrollable) ? null : dropInfo}
                onTouchMove={(!isTabletOrDesktop && isScrollable) ? null : dragInfo}
                onTouchStart={(!isTabletOrDesktop && isScrollable) ? null : updateStartPosition}
                style={isTabletOrDesktop ? null : mobileContainerStyle}
            >
                <PlaceInfoHeader
                    name={place.name}
                    setIsScrollable={setIsScrollable}
                    setPosition={setPosition}
                    updatedAt={place.updatedAt}
                />
                <PlaceInfoBody
                    address={place.address}
                    childMasksLeft={place.childMasksLeft}
                    isScrollable={isScrollable}
                    masksLeft={place.masksLeft}
                    note={place.note}
                    opensOn={place.opensOn}
                    phone={place.phone}
                    setIsScrollable={setIsScrollable}
                    setPosition={setPosition}
                    updatedAt={place.updatedAt}
                />
            </article>
        </FullScreenOverlay>
    );
};

PlaceInfo.propTypes = {
    setMapCenter: PropTypes.func.isRequired,
    setZoomLevel: PropTypes.func.isRequired,
};

export default PlaceInfo;
