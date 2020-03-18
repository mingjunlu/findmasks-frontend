import React from 'react';
import PropTypes from 'prop-types';
import useScrollLock from '../../hooks/useScrollLock';
import styles from './FullScreenOverlay.module.css';

const FullScreenOverlay = (props) => {
    const {
        backgroundColor,
        children,
        isLocked,
        pointerEvents,
        zIndex,
    } = props;

    useScrollLock(isLocked);

    return (
        <div className={styles.container} style={{ backgroundColor, pointerEvents, zIndex }}>
            <>
                {children}
            </>
        </div>
    );
};

FullScreenOverlay.propTypes = {
    backgroundColor: PropTypes.string,
    children: PropTypes.element,
    isLocked: PropTypes.bool,
    pointerEvents: PropTypes.string,
    zIndex: PropTypes.number,
};

FullScreenOverlay.defaultProps = {
    backgroundColor: 'rgba(28, 28, 30, 0.5)',
    children: null,
    isLocked: true,
    pointerEvents: null,
    zIndex: 0,
};

export default FullScreenOverlay;
