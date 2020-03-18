import React, { useState } from 'react';
import BottomSheet from './components/BottomSheet/BottomSheet';
import MaskMap from './components/MaskMap/MaskMap';

const App = () => {
    const [selectedPlace, setSelectedPlace] = useState({});
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

    return (
        <>
            {isBottomSheetVisible && (
                <BottomSheet
                    placeAddress={selectedPlace.address}
                    placeChildMasksLeft={selectedPlace.childMasksLeft}
                    placeMasksLeft={selectedPlace.masksLeft}
                    placeName={selectedPlace.name}
                    placeNote={selectedPlace.note}
                    placeOpensOn={selectedPlace.opensOn}
                    placePhone={selectedPlace.phone}
                    placeUpdatedAt={selectedPlace.updatedAt}
                    setIsBottomSheetVisible={setIsBottomSheetVisible}
                />
            )}
            <MaskMap
                setIsBottomSheetVisible={setIsBottomSheetVisible}
                setSelectedPlace={setSelectedPlace}
            />
        </>
    );
};

export default App;
