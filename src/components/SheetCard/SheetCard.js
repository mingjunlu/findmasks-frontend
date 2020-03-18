import React from 'react';
import PropTypes from 'prop-types';
import styles from './SheetCard.module.css';

const SheetCard = (props) => {
    const {
        backgroundColor,
        label,
        suffix,
        value,
    } = props;

    return (
        <p className={styles.container} style={{ backgroundColor }}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>{value}</span>
            {suffix && <span className={styles.suffix}>{suffix}</span>}
        </p>
    );
};

SheetCard.propTypes = {
    backgroundColor: PropTypes.string,
    label: PropTypes.string.isRequired,
    suffix: PropTypes.string,
    value: PropTypes.string.isRequired,
};

SheetCard.defaultProps = {
    backgroundColor: 'rgb(142, 142, 147)',
    suffix: '',
};

export default SheetCard;
