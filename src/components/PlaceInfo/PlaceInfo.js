import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import ReactGA from 'react-ga';
import ErrorScreen from '../ErrorScreen/ErrorScreen';
import FullScreenOverlay from '../FullScreenOverlay/FullScreenOverlay';
import PlaceInfoHeader from '../PlaceInfoHeader/PlaceInfoHeader';
import PlaceInfoBody from '../PlaceInfoBody/PlaceInfoBody';
import styles from './PlaceInfo.module.css';

const isProduction = (process.env.NODE_ENV === 'production');

const PlaceInfo = () => {
    const [isScrollable, setIsScrollable] = useState(false);
    const [error, setError] = useState(null);
    const [place, setPlace] = useState({
        name: '',
        phone: '',
        address: '',
        masksLeft: NaN,
        childMasksLeft: NaN,
        opensOn: [],
        note: '',
        updatedAt: '',
    });

    // Update the page title
    useEffect(() => {
        const originalTitle = document.title;
        if (place.name) { document.title = `${place.name} | 口罩咧？`; }
        return () => { document.title = originalTitle; };
    }, [place.name]);

    const { id } = useParams();
    useEffect(() => {
        let isMounted = true;

        const getFeature = async () => {
            let fetchedData;
            try {
                const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/${id}`);
                if (!response.ok) {
                    const { status, statusText } = response;
                    throw new Error(`${status} ${statusText}`);
                }
                const feature = await response.json();
                fetchedData = feature.properties;
            } catch (err) {
                setError(err);
            }
            if (isMounted && fetchedData) {
                setPlace(fetchedData);
            }
        };
        getFeature();

        // Prevent setting state after unmounted
        return () => { isMounted = false; };
    }, [id]);

    const history = useHistory();
    const goToHomepage = () => { history.push('/'); };

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
            setTimeout(goToHomepage, 100);
            if (isProduction) {
                ReactGA.event({
                    category: 'PlaceInfo',
                    action: 'Swiped down to minimize',
                });
            }
        }
    };

    const isTabletOrDesktop = useMediaQuery({ query: '(min-width: 640px)' });
    const mobileContainerStyle = {
        transform: `translateY(${position}px)`,
        willChange: 'transform',
    };

    if (error) {
        return (
            <ErrorScreen
                isCloseable
                onClick={goToHomepage}
                message="無法取得資料"
            />
        );
    }

    const overlayColor = (!isTabletOrDesktop && isScrollable) ? undefined : 'transparent';
    const pointerEvents = (!isTabletOrDesktop && isScrollable) ? null : 'none';

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
                />
            </article>
        </FullScreenOverlay>
    );
};

export default PlaceInfo;
