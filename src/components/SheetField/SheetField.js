import React from 'react';
import PropTypes from 'prop-types';
import styles from './SheetField.module.css';

const SheetField = (props) => {
    const {
        children,
        color,
        label,
        value,
    } = props;

    return (
        <div className={styles.container}>
            <h2 className={styles.label}>{label}</h2>
            {value && <span className={styles.value} style={{ color }}>{value}</span>}
            <>
                {children}
            </>
        </div>
    );
};

SheetField.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element),
    color: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
};

SheetField.defaultProps = {
    children: null,
    color: null,
    label: '',
    value: '',
};

export default SheetField;
