import React from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import ReactGA from 'react-ga';
import dayjs from 'dayjs';
import SheetCard from '../SheetCard/SheetCard';
import SheetFieldLink from '../SheetFieldLink/SheetFieldLink';
import SheetField from '../SheetField/SheetField';
import getCardColor from '../../utilities/getCardColor';
import styles from './PlaceInfoBody.module.css';

const isProduction = (process.env.NODE_ENV === 'production');

const PlaceInfoBody = (props) => {
    const {
        address,
        childMasksLeft,
        isScrollable,
        masksLeft,
        note,
        opensOn,
        phone,
        setIsScrollable,
        setPosition,
    } = props;

    const initialPosition = Math.round(window.innerHeight * 0.6);
    const condenseInfo = (event) => {
        const hasReachedTop = (event.target.scrollTop < 1);
        if (!hasReachedTop) { return; }
        setPosition(initialPosition);
        setIsScrollable(false);
        if (isProduction) {
            ReactGA.event({
                category: 'PlaceInfoBody',
                action: 'Swiped down to condense',
            });
        }
    };

    const handleAddressClick = () => {
        if (isProduction) {
            ReactGA.event({
                category: 'PlaceInfoBody',
                action: 'Clicked the address link',
            });
        }
    };

    const handlePhoneClick = () => {
        if (isProduction) {
            ReactGA.event({
                category: 'PlaceInfoBody',
                action: 'Clicked the phone link',
            });
        }
    };

    const isTabletOrDesktop = useMediaQuery({ query: '(min-width: 640px)' });

    return (
        <div
            className={styles.container}
            onScroll={isTabletOrDesktop ? null : condenseInfo}
            style={{ overflowY: (isTabletOrDesktop || isScrollable) ? 'auto' : 'hidden' }}
        >
            <div className={styles.cards}>
                <SheetCard
                    backgroundColor={getCardColor(masksLeft, 600)}
                    label="成人口罩"
                    suffix="片"
                    value={Number.isNaN(masksLeft) ? '' : masksLeft.toLocaleString()}
                />
                <SheetCard
                    backgroundColor={getCardColor(childMasksLeft, 200)}
                    label="兒童口罩"
                    suffix="片"
                    value={Number.isNaN(childMasksLeft) ? '' : childMasksLeft.toLocaleString()}
                />
            </div>
            <div>
                <SheetFieldLink
                    baseWidth="22.0rem"
                    color="rgb(10, 132, 255)"
                    href={`https://www.google.com/maps/dir/current+location/${address}`}
                    label="地址"
                    onClick={handleAddressClick}
                    value={address}
                />
                <SheetFieldLink
                    baseWidth="10.0rem"
                    color="rgb(10, 132, 255)"
                    href={`tel:${phone.replace(/\(0.*\)/, '+886')}`}
                    label="電話"
                    onClick={handlePhoneClick}
                    value={phone}
                />
            </div>
            {note && <SheetField label="備註" value={note} />}
            {(opensOn.length > 0) && (
                <SheetField label="營業時段">
                    {opensOn.map((text, index) => {
                        const isFirstOne = (index === 0);
                        const dayOfWeek = dayjs().add(index, 'day');
                        return (
                            <p
                                className={styles.text}
                                key={index.toString()}
                                style={{ fontWeight: isFirstOne ? 'bold' : null }}
                            >
                                <span>{dayOfWeek.format('dddd')}</span>
                                <span>{opensOn[dayOfWeek.day()]}</span>
                            </p>
                        );
                    })}
                </SheetField>
            )}
            <SheetField
                label="使用須知"
                value="以上資訊僅供參考，實際情形請以藥局與衛生所現場狀況為準。此外，健保署系統無法顯示藥局發放的號碼牌數量，請格外留意。"
            />
        </div>
    );
};

PlaceInfoBody.propTypes = {
    address: PropTypes.string.isRequired,
    childMasksLeft: PropTypes.number.isRequired,
    isScrollable: PropTypes.bool.isRequired,
    masksLeft: PropTypes.number.isRequired,
    note: PropTypes.string.isRequired,
    opensOn: PropTypes.arrayOf(PropTypes.string).isRequired,
    phone: PropTypes.string.isRequired,
    setIsScrollable: PropTypes.func.isRequired,
    setPosition: PropTypes.func.isRequired,
};

export default PlaceInfoBody;
