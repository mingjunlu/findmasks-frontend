import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import ReactGA from 'react-ga';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import styles from './PlaceInfoHeader.module.css';

dayjs.extend(relativeTime);
const isProduction = (process.env.NODE_ENV === 'production');

const PlaceInfoHeader = (props) => {
    const {
        name,
        setIsScrollable,
        setPosition,
        updatedAt,
    } = props;

    const history = useHistory();
    const topBoundary = 32;
    const initialPosition = Math.round(window.innerHeight * 0.6);

    const dragInfo = (event) => {
        const newPosition = Math.round(event.touches[0].clientY);
        setPosition((newPosition < topBoundary) ? topBoundary : newPosition);
    };

    const dropInfo = (event) => {
        const newPosition = Math.round(event.changedTouches[0].clientY);
        if (newPosition > initialPosition) {
            setPosition(Math.round(window.innerHeight * 1.1));
            setTimeout(() => { history.push('/'); }, 100);
            if (isProduction) {
                ReactGA.event({
                    category: 'PlaceInfoHeader',
                    action: 'Swiped down to minimize',
                });
            }
        } else if (newPosition > (topBoundary + 10)) {
            setPosition(initialPosition);
            setIsScrollable(false);
            if (isProduction) {
                ReactGA.event({
                    category: 'PlaceInfoHeader',
                    action: 'Swiped down to condense',
                });
            }
        }
    };

    const closeInfo = () => {
        if (isProduction) {
            ReactGA.event({
                category: 'PlaceInfoHeader',
                action: 'Clicked the close button',
            });
        }
    };

    const isTabletOrDesktop = useMediaQuery({ query: '(min-width: 640px)' });

    return (
        <header
            className={styles.container}
            onTouchEnd={isTabletOrDesktop ? null : dropInfo}
            onTouchMove={isTabletOrDesktop ? null : dragInfo}
        >
            <div className={styles.headingContainer}>
                <h1 className={styles.heading}>{name}</h1>
                <Link to="/" onClick={closeInfo} className={styles.button}>
                    <CloseIcon className={styles.icon} />
                </Link>
            </div>
            <p className={styles.subheading}>{updatedAt && dayjs(updatedAt).fromNow()}</p>
        </header>
    );
};

PlaceInfoHeader.propTypes = {
    name: PropTypes.string.isRequired,
    setIsScrollable: PropTypes.func.isRequired,
    setPosition: PropTypes.func.isRequired,
    updatedAt: PropTypes.string.isRequired,
};

export default PlaceInfoHeader;
