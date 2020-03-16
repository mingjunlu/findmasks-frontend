import React from 'react';
import PropTypes from 'prop-types';
import useScrollLock from '../../hooks/useScrollLock';
import styles from './FullScreenOverlay.module.css';

const FullScreenOverlay = ({ backgroundColor, children, zIndex }) => {
    useScrollLock();

    return (
        <div className={styles.container} style={{ backgroundColor, zIndex }}>
            <>
                {children}
            </>
        </div>
    );
};

FullScreenOverlay.propTypes = {
    backgroundColor: PropTypes.string,
    children: PropTypes.element,
    zIndex: PropTypes.number,
};

FullScreenOverlay.defaultProps = {
    backgroundColor: 'rgba(28, 28, 30, 0.5)',
    children: null,
    zIndex: 0,
};

export default FullScreenOverlay;
