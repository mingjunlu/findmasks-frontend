import React from 'react';
import PropTypes from 'prop-types';
import FullScreenOverlay from '../FullScreenOverlay/FullScreenOverlay';
import { ReactComponent as CautionIcon } from '../../assets/caution.svg';
import styles from './ErrorScreen.module.css';

const ErrorScreen = ({ message }) => (
    <FullScreenOverlay backgroundColor="rgba(28, 28, 30, 0.7)" zIndex={3}>
        <div className={styles.container}>
            <div className={styles.box}>
                <CautionIcon className={styles.icon} />
                {message && <p className={styles.text}>{message}</p>}
            </div>
        </div>
    </FullScreenOverlay>
);

ErrorScreen.propTypes = {
    message: PropTypes.string,
};

ErrorScreen.defaultProps = {
    message: '',
};

export default ErrorScreen;
