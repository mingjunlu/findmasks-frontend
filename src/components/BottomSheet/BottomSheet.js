import React, { useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw';
import relativeTime from 'dayjs/plugin/relativeTime';
import weekday from 'dayjs/plugin/weekday';
import { ReactComponent as CancelIcon } from '../../assets/cancel.svg';
import FullScreenOverlay from '../FullScreenOverlay/FullScreenOverlay';
import getCardColor from './getCardColor';
import styles from './BottomSheet.module.css';

dayjs.locale('zh-tw');
dayjs.extend(relativeTime);
dayjs.extend(weekday);

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
        setIsBottomSheetVisible,
    } = props;

    const topBoundary = 32;
    const bottomBoundary = Math.round(window.innerHeight * 0.8);
    const halfHeight = Math.round(window.innerHeight * 0.5);
    const initialPosition = Math.round(window.innerHeight * 0.6);

    const [position, setPosition] = useState(initialPosition);
    const [isScrollable, setIsScrollable] = useState(false);

    const removeSheet = () => { setIsBottomSheetVisible(false); };
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
            // Expand the sheet
            setPosition(topBoundary);
            setIsScrollable(true);
        } else if (newPosition > bottomBoundary) {
            // Minimize the sheet
            setPosition(Math.round(window.innerHeight * 1.1));
            setIsBottomSheetVisible(false);
        } else {
            // Condense the sheet
            setPosition(initialPosition);
            setIsScrollable(false);
        }
    };

    const overlayColor = isScrollable ? undefined : 'transparent';
    const pointerEvents = isScrollable ? null : 'none';
    const overflowY = isScrollable ? 'auto' : 'hidden';
    const masksLeftCardColor = getCardColor(placeMasksLeft, 400);
    const childMasksLeftCardColor = getCardColor(placeChildMasksLeft, 200);
    const addressLink = `https://www.google.com/maps/dir/current+location/${placeAddress}`;
    const phoneLink = `tel:${(placePhone || '').replace(/\(0.*\)/, '+886')}`;

    return (
        <FullScreenOverlay
            backgroundColor={overlayColor}
            pointerEvents={pointerEvents}
            zIndex={4}
        >
            <article className={styles.container} style={{ transform: `translateY(${position}px)` }}>
                <header className={styles.header} onTouchEnd={dropSheet} onTouchMove={dragSheet}>
                    <div className={styles.topBar}>
                        <h1 className={styles.title}>{placeName}</h1>
                        <button type="button" className={styles.cancelButton} onClick={removeSheet}>
                            <CancelIcon className={styles.cancelIcon} />
                        </button>
                    </div>
                    <p className={styles.time}>
                        {placeUpdatedAt ? dayjs(placeUpdatedAt).fromNow() : ''}
                    </p>
                </header>
                <div className={styles.content} style={{ overflowY }}>
                    <div className={styles.cards}>
                        <p
                            className={styles.card}
                            style={{ backgroundColor: masksLeftCardColor }}
                        >
                            <span className={styles.cardLabel}>成人口罩</span>
                            <span className={styles.cardValue}>
                                {placeMasksLeft.toLocaleString()}
                            </span>
                        </p>
                        <p
                            className={styles.card}
                            style={{ backgroundColor: childMasksLeftCardColor }}
                        >
                            <span className={styles.cardLabel}>兒童口罩</span>
                            <span className={styles.cardValue}>
                                {placeChildMasksLeft.toLocaleString()}
                            </span>
                        </p>
                    </div>
                    <div>
                        <a href={addressLink} className={styles.touchable}>
                            <span className={styles.touchableLabel}>地址</span>
                            <span className={`${styles.touchableValue} ${styles.touchableAddress}`}>
                                {placeAddress || ''}
                            </span>
                        </a>
                        <a href={phoneLink} className={styles.touchable}>
                            <span className={styles.touchableLabel}>電話</span>
                            <span className={`${styles.touchableValue} ${styles.touchablePhone}`}>
                                {placePhone || ''}
                            </span>
                        </a>
                    </div>
                    {placeNote && (
                        <p className={styles.touchable}>
                            <span className={styles.touchableLabel}>備註</span>
                            <span className={`${styles.touchableValue} ${styles.touchableNote}`}>
                                {placeNote}
                            </span>
                        </p>
                    )}
                    {placeOpensOn && (placeOpensOn.length > 0) && (
                        <div className={styles.touchable}>
                            <span className={styles.touchableLabel}>營業時段</span>
                            <span className={`${styles.touchableValue} ${styles.touchableNote}`}>
                                {placeOpensOn.map((text, index) => {
                                    const dayOfWeek = dayjs().add(index, 'day');
                                    return (
                                        <p
                                            className={`${styles.touchableValue} ${styles.touchablePeriod}`}
                                            key={index.toString()}
                                        >
                                            <span>{dayOfWeek.format('dddd')}</span>
                                            <span>{placeOpensOn[dayOfWeek.day()]}</span>
                                        </p>
                                    );
                                })}
                            </span>
                        </div>
                    )}
                </div>
            </article>
        </FullScreenOverlay>
    );
};

BottomSheet.propTypes = {
    placeAddress: PropTypes.string,
    placeChildMasksLeft: PropTypes.number.isRequired,
    placeMasksLeft: PropTypes.number.isRequired,
    placeName: PropTypes.string.isRequired,
    placeNote: PropTypes.string,
    placeOpensOn: PropTypes.arrayOf(PropTypes.string),
    placePhone: PropTypes.string,
    placeUpdatedAt: PropTypes.string,
    setIsBottomSheetVisible: PropTypes.func.isRequired,
};

BottomSheet.defaultProps = {
    placeAddress: '',
    placeNote: '',
    placeOpensOn: [],
    placePhone: '',
    placeUpdatedAt: '',
};

export default BottomSheet;
