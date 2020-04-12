import React from 'react';
import PropTypes from 'prop-types';
import FullScreenOverlay from '../FullScreenOverlay/FullScreenOverlay';
import styles from './LoadingScreen.module.css';

const LoadingScreen = ({ message }) => (
    <FullScreenOverlay zIndex={3}>
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.spinner}>
                    {[...Array(12)].map((item, index) => (
                        <div className={styles.blade} key={index.toString()} />
                    ))}
                </div>
                <p className={styles.text}>{message}</p>
            </div>
        </div>
    </FullScreenOverlay>
);

LoadingScreen.propTypes = {
    message: PropTypes.string,
};

LoadingScreen.defaultProps = {
    message: '載入中',
};

export default LoadingScreen;
