import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import FullScreenOverlay from '../FullScreenOverlay/FullScreenOverlay';
import SheetHeader from '../SheetHeader/SheetHeader';
import SheetContent from '../SheetContent/SheetContent';
import styles from './SideSheet.module.css';

dayjs.extend(relativeTime);

const SideSheet = (props) => {
    const {
        placeAddress,
        placeChildMasksLeft,
        placeMasksLeft,
        placeName,
        placeNote,
        placeOpensOn,
        placePhone,
        placeUpdatedAt,
        setIsSheetVisible,
    } = props;

    const removeSheet = () => { setIsSheetVisible(false); };

    return (
        <FullScreenOverlay backgroundColor="transparent" pointerEvents="none" zIndex={4}>
            <article className={styles.container}>
                <SheetHeader
                    heading={placeName}
                    removeSheet={removeSheet}
                    subheading={placeUpdatedAt && dayjs(placeUpdatedAt).fromNow()}
                />
                <SheetContent
                    isScrollable
                    placeAddress={placeAddress}
                    placeChildMasksLeft={placeChildMasksLeft}
                    placeMasksLeft={placeMasksLeft}
                    placeNote={placeNote}
                    placeOpensOn={placeOpensOn}
                    placePhone={placePhone}
                />
            </article>
        </FullScreenOverlay>
    );
};

SideSheet.propTypes = {
    placeAddress: PropTypes.string.isRequired,
    placeChildMasksLeft: PropTypes.number.isRequired,
    placeMasksLeft: PropTypes.number.isRequired,
    placeName: PropTypes.string.isRequired,
    placeNote: PropTypes.string.isRequired,
    placeOpensOn: PropTypes.arrayOf(PropTypes.string).isRequired,
    placePhone: PropTypes.string.isRequired,
    placeUpdatedAt: PropTypes.string.isRequired,
    setIsSheetVisible: PropTypes.func.isRequired,
};

export default SideSheet;
