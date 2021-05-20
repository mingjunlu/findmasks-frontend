import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import styles from './PlaceInfoHeader.module.css';

dayjs.extend(relativeTime);
const isProduction = (process.env.NODE_ENV === 'production');

const PlaceInfoHeader = ({ name, updatedAt }) => {
    const closeInfo = () => {
        if (isProduction) {
            ReactGA.event({
                category: 'PlaceInfoHeader',
                action: 'Clicked the close button',
            });
        }
    };

    return (
        <>
            <div className={styles.headingContainer}>
                <h1 className={styles.heading}>{name}</h1>
                <Link to="/" onClick={closeInfo} className={styles.button}>
                    <CloseIcon className={styles.icon} />
                </Link>
            </div>
            <p className={styles.subheading}>{updatedAt && dayjs(updatedAt).fromNow()}</p>
        </>
    );
};

PlaceInfoHeader.propTypes = {
    name: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
};

export default React.memo(PlaceInfoHeader);
