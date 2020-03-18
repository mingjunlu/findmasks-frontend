import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import styles from './SheetHeader.module.css';

const SheetHeader = (props) => {
    const {
        dragSheet,
        dropSheet,
        heading,
        removeSheet,
        subheading,
    } = props;

    return (
        <header className={styles.container} onTouchEnd={dropSheet} onTouchMove={dragSheet}>
            <div className={styles.headingContainer}>
                <h1 className={styles.heading}>{heading}</h1>
                <button type="button" className={styles.button} onClick={removeSheet}>
                    <CloseIcon className={styles.icon} />
                </button>
            </div>
            <p className={styles.subheading}>{subheading}</p>
        </header>
    );
};

SheetHeader.propTypes = {
    dragSheet: PropTypes.func,
    dropSheet: PropTypes.func,
    heading: PropTypes.string.isRequired,
    removeSheet: PropTypes.func.isRequired,
    subheading: PropTypes.string,
};

SheetHeader.defaultProps = {
    dragSheet: null,
    dropSheet: null,
    subheading: '',
};

export default SheetHeader;
