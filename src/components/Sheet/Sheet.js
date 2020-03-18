import React from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import SideSheet from '../SideSheet/SideSheet';
import BottomSheet from '../BottomSheet/BottomSheet';

const Sheet = (props) => {
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

    const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

    if (!isMobile) {
        return (
            <SideSheet
                placeAddress={placeAddress}
                placeChildMasksLeft={placeChildMasksLeft}
                placeMasksLeft={placeMasksLeft}
                placeName={placeName}
                placeNote={placeNote}
                placeOpensOn={placeOpensOn}
                placePhone={placePhone}
                placeUpdatedAt={placeUpdatedAt}
                setIsSheetVisible={setIsSheetVisible}
            />
        );
    }

    return (
        <BottomSheet
            placeAddress={placeAddress}
            placeChildMasksLeft={placeChildMasksLeft}
            placeMasksLeft={placeMasksLeft}
            placeName={placeName}
            placeNote={placeNote}
            placeOpensOn={placeOpensOn}
            placePhone={placePhone}
            placeUpdatedAt={placeUpdatedAt}
            setIsSheetVisible={setIsSheetVisible}
        />
    );
};

Sheet.propTypes = {
    placeAddress: PropTypes.string,
    placeChildMasksLeft: PropTypes.number.isRequired,
    placeMasksLeft: PropTypes.number.isRequired,
    placeName: PropTypes.string.isRequired,
    placeNote: PropTypes.string,
    placeOpensOn: PropTypes.arrayOf(PropTypes.string),
    placePhone: PropTypes.string,
    placeUpdatedAt: PropTypes.string,
    setIsSheetVisible: PropTypes.func.isRequired,
};

Sheet.defaultProps = {
    placeAddress: '',
    placeNote: '',
    placeOpensOn: [],
    placePhone: '',
    placeUpdatedAt: '',
};

export default Sheet;
