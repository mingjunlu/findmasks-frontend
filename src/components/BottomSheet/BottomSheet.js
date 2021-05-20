import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import ReactGA from 'react-ga';
import styles from './BottomSheet.module.css';

const isProduction = (process.env.NODE_ENV === 'production');
const initialPosition = Math.round(window.innerHeight * 0.6);
const topBoundary = 32;

const BottomSheet = (props) => {
    const {
        isScrollable,
        setIsScrollable,
        header,
        body,
    } = props;

    const history = useHistory();
    const goToHomepage = () => { history.push('/'); };

    const isTabletOrDesktop = useMediaQuery({ query: '(min-width: 640px)' });
    const isExpanded = !isTabletOrDesktop && isScrollable;

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
                    category: 'BottomSheet',
                    action: 'Swiped up to expand',
                });
            }
        } else if (shouldMinimize) {
            setPosition(Math.round(window.innerHeight * 1.1));
            setTimeout(goToHomepage, 100);
            if (isProduction) {
                ReactGA.event({
                    category: 'BottomSheet',
                    action: 'Swiped down to minimize',
                });
            }
        }
    };

    const condenseInfo = (event) => {
        const hasReachedTop = (event.target.scrollTop < 1);
        if (!hasReachedTop) { return; }
        setPosition(initialPosition);
        setIsScrollable(false);
        if (isProduction) {
            ReactGA.event({
                category: 'BottomSheet',
                action: 'Swiped down to condense',
            });
        }
    };

    const mobileContainerStyle = {
        transform: `translateY(${position}px)`,
        willChange: 'transform',
    };

    return (
        <div
            className={styles.container}
            onTouchEnd={isExpanded ? null : dropInfo}
            onTouchMove={isExpanded ? null : dragInfo}
            onTouchStart={isExpanded ? null : updateStartPosition}
            style={isTabletOrDesktop ? null : mobileContainerStyle}
        >
            <div
                className={styles.headerContainer}
                onTouchEnd={isTabletOrDesktop ? null : dropInfo}
                onTouchMove={isTabletOrDesktop ? null : dragInfo}
            >
                {header}
            </div>
            <div
                className={styles.bodyContainer}
                onScroll={isTabletOrDesktop ? null : condenseInfo}
                style={{ overflowY: (isTabletOrDesktop || isScrollable) ? 'auto' : 'hidden' }}
            >
                {body}
            </div>
        </div>
    );
};

BottomSheet.propTypes = {
    isScrollable: PropTypes.bool.isRequired,
    setIsScrollable: PropTypes.func.isRequired,
    header: PropTypes.element,
    body: PropTypes.element,
};

BottomSheet.defaultProps = {
    header: null,
    body: null,
};

export default BottomSheet;
