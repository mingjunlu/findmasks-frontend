import React from 'react';
import FullScreenOverlay from '../FullScreenOverlay/FullScreenOverlay';
import styles from './LoadingScreen.module.css';

const LoadingScreen = () => (
    <FullScreenOverlay zIndex={3}>
        <div className={styles.container}>
            <div className={styles.spinner}>
                {[...Array(12)].map((item, index) => (
                    <div className={styles.blade} key={index.toString()} />
                ))}
            </div>
        </div>
    </FullScreenOverlay>
);

export default LoadingScreen;
