import React from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import getCardColor from './getCardColor';
import SheetCard from '../SheetCard/SheetCard';
import SheetFieldLink from '../SheetFieldLink/SheetFieldLink';
import SheetField from '../SheetField/SheetField';
import styles from './SheetContent.module.css';

dayjs.extend(weekday);

// Clear the old value
const hasOldValue = !!localStorage.getItem('agreement');
if (hasOldValue) { localStorage.removeItem('agreement'); }

const SheetContent = (props) => {
    const {
        isScrollable,
        placeAddress,
        placeChildMasksLeft,
        placeMasksLeft,
        placeNote,
        placeOpensOn,
        placePhone,
    } = props;

    const onAddressClick = () => {
        ReactGA.event({
            category: 'BottomSheet',
            action: 'Clicked the address link',
        });
    };

    const onPhoneClick = () => {
        ReactGA.event({
            category: 'BottomSheet',
            action: 'Clicked the phone link',
        });
    };

    return (
        <div className={styles.container} style={{ overflowY: (isScrollable ? 'auto' : 'hidden') }}>
            <div className={styles.cards}>
                <SheetCard
                    backgroundColor={getCardColor(placeMasksLeft, 400)}
                    label="成人口罩"
                    suffix="片"
                    value={placeMasksLeft.toLocaleString()}
                />
                <SheetCard
                    backgroundColor={getCardColor(placeChildMasksLeft, 200)}
                    label="兒童口罩"
                    suffix="片"
                    value={placeChildMasksLeft.toLocaleString()}
                />
            </div>
            <div>
                <SheetFieldLink
                    baseWidth="22.0rem"
                    color="rgb(10, 132, 255)"
                    href={`https://www.google.com/maps/dir/current+location/${placeAddress}`}
                    label="地址"
                    onClick={onAddressClick}
                    value={placeAddress}
                />
                <SheetFieldLink
                    baseWidth="10.0rem"
                    color="rgb(10, 132, 255)"
                    href={`tel:${placePhone.replace(/\(0.*\)/, '+886')}`}
                    label="電話"
                    onClick={onPhoneClick}
                    value={placePhone}
                />
            </div>
            {placeNote && <SheetField label="備註" value={placeNote} />}
            {placeOpensOn && (placeOpensOn.length > 0) && (
                <SheetField label="營業時段">
                    {placeOpensOn.map((text, index) => {
                        const isFirstOne = (index === 0);
                        const dayOfWeek = dayjs().add(index, 'day');
                        return (
                            <p
                                className={styles.text}
                                key={index.toString()}
                                style={{ fontWeight: isFirstOne ? 'bold' : null }}
                            >
                                <span>{dayOfWeek.format('dddd')}</span>
                                <span>{placeOpensOn[dayOfWeek.day()]}</span>
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

SheetContent.propTypes = {
    isScrollable: PropTypes.bool.isRequired,
    placeAddress: PropTypes.string.isRequired,
    placeChildMasksLeft: PropTypes.number.isRequired,
    placeMasksLeft: PropTypes.number.isRequired,
    placeNote: PropTypes.string.isRequired,
    placeOpensOn: PropTypes.arrayOf(PropTypes.string).isRequired,
    placePhone: PropTypes.string.isRequired,
};

export default SheetContent;
