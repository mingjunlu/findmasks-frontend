import React from 'react';
import PropTypes from 'prop-types';
import styles from '../SheetField/SheetField.module.css';

const SheetFieldLink = (props) => {
    const {
        baseWidth,
        children,
        color,
        href,
        label,
        onClick,
        value,
    } = props;

    return (
        <a href={href} onClick={onClick} className={styles.container}>
            <h2 className={styles.label}>{label}</h2>
            <span
                className={styles.value}
                style={{ color, '--width': baseWidth }}
            >
                {value}
            </span>
            <>
                {children}
            </>
        </a>
    );
};

SheetFieldLink.propTypes = {
    baseWidth: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.element),
    color: PropTypes.string,
    href: PropTypes.string.isRequired,
    label: PropTypes.string,
    onClick: PropTypes.func,
    value: PropTypes.string,
};

SheetFieldLink.defaultProps = {
    baseWidth: null,
    children: null,
    color: null,
    label: '',
    onClick: null,
    value: '',
};

export default SheetFieldLink;
