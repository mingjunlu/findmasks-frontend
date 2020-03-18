import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import FullScreenOverlay from '../FullScreenOverlay/FullScreenOverlay';
import SheetHeader from '../SheetHeader/SheetHeader';
import SheetContent from '../SheetContent/SheetContent';
import styles from './BottomSheet.module.css';

dayjs.extend(relativeTime);

const BottomSheet = (props) => {
    const {
        placeAddress,
        placeChildMasksLeft,
        placeMasksLeft,
        placeName,
        placeNote,
        placeOpensOn,
        placePhone,
        placeUpdatedAt,
        setIsSheetVisible,
    } = props;

    const topBoundary = 32;
    const bottomBoundary = Math.round(window.innerHeight * 0.8);
    const halfHeight = Math.round(window.innerHeight * 0.5);
    const initialPosition = Math.round(window.innerHeight * 0.6);

    const [position, setPosition] = useState(initialPosition);
    const [isScrollable, setIsScrollable] = useState(false);

    const removeSheet = () => {
        setIsSheetVisible(false);
        ReactGA.event({
            category: 'BottomSheet',
            action: 'Clicked the close button',
        });
    };
    const dragSheet = (event) => {
        const newPosition = Math.round(event.touches[0].clientY);
        if (newPosition === position) { return; }
        if (newPosition > topBoundary) {
            setPosition(newPosition);
        }
    };
    const dropSheet = (event) => {
        const newPosition = Math.round(event.changedTouches[0].clientY);
        if (newPosition < halfHeight) {
            setPosition(topBoundary);
            setIsScrollable(true);
            ReactGA.event({
                category: 'BottomSheet',
                action: 'Swiped up to expand the sheet',
            });
        } else if (newPosition > bottomBoundary) {
            setPosition(Math.round(window.innerHeight * 1.1));
            setIsSheetVisible(false);
            ReactGA.event({
                category: 'BottomSheet',
                action: 'Swiped down to minimize the sheet',
            });
        } else {
            setPosition(initialPosition);
            setIsScrollable(false);
            ReactGA.event({
                category: 'BottomSheet',
                action: 'Swiped down to condense the sheet',
            });
        }
    };

    const overlayColor = isScrollable ? undefined : 'transparent';
    const pointerEvents = isScrollable ? null : 'none';

    return (
        <FullScreenOverlay backgroundColor={overlayColor} pointerEvents={pointerEvents} zIndex={4}>
            <article className={styles.container} style={{ transform: `translateY(${position}px)` }}>
                <SheetHeader
                    dragSheet={dragSheet}
                    dropSheet={dropSheet}
                    heading={placeName}
                    removeSheet={removeSheet}
                    subheading={placeUpdatedAt && dayjs(placeUpdatedAt).fromNow()}
                />
                <SheetContent
                    isScrollable={isScrollable}
                    placeAddress={placeAddress}
                    placeChildMasksLeft={placeChildMasksLeft}
                    placeMasksLeft={placeMasksLeft}
                    placeNote={placeNote}
                    placeOpensOn={placeOpensOn}
                    placePhone={placePhone}
                />
            </article>
        </FullScreenOverlay>
    );
};

BottomSheet.propTypes = {
    placeAddress: PropTypes.string.isRequired,
    placeChildMasksLeft: PropTypes.number.isRequired,
    placeMasksLeft: PropTypes.number.isRequired,
    placeName: PropTypes.string.isRequired,
    placeNote: PropTypes.string.isRequired,
    placeOpensOn: PropTypes.arrayOf(PropTypes.string).isRequired,
    placePhone: PropTypes.string.isRequired,
    placeUpdatedAt: PropTypes.string.isRequired,
    setIsSheetVisible: PropTypes.func.isRequired,
};


export default BottomSheet;
