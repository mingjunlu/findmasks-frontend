import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import { ReactComponent as CautionIcon } from '../../assets/icons/caution.svg';
import FullScreenOverlay from '../FullScreenOverlay/FullScreenOverlay';
import styles from './ErrorScreen.module.css';

const ErrorScreen = ({ isCloseable, message, onClick }) => (
    <FullScreenOverlay backgroundColor="rgba(28, 28, 30, 0.7)" zIndex={3}>
        <div className={styles.container}>
            {isCloseable && (
                <button type="button" onClick={onClick} className={styles.button}>
                    <CloseIcon className={styles.closeIcon} />
                </button>
            )}
            <div className={styles.box}>
                <CautionIcon className={styles.cautionIcon} />
                <p className={styles.text}>{message}</p>
            </div>
        </div>
    </FullScreenOverlay>
);

ErrorScreen.propTypes = {
    isCloseable: PropTypes.bool,
    message: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

ErrorScreen.defaultProps = {
    isCloseable: false,
    onClick: null,
};

export default ErrorScreen;
