import React, { useState } from 'react';
import Sheet from './components/Sheet/Sheet';
import MaskMap from './components/MaskMap/MaskMap';

const App = () => {
    const [selectedPlace, setSelectedPlace] = useState({});
    const [isSheetVisible, setIsSheetVisible] = useState(false);

    return (
        <>
            {isSheetVisible && (
                <Sheet
                    placeAddress={selectedPlace.address}
                    placeChildMasksLeft={selectedPlace.childMasksLeft}
                    placeMasksLeft={selectedPlace.masksLeft}
                    placeName={selectedPlace.name}
                    placeNote={selectedPlace.note}
                    placeOpensOn={selectedPlace.opensOn}
                    placePhone={selectedPlace.phone}
                    placeUpdatedAt={selectedPlace.updatedAt}
                    setIsSheetVisible={setIsSheetVisible}
                />
            )}
            <MaskMap
                setIsSheetVisible={setIsSheetVisible}
                setSelectedPlace={setSelectedPlace}
            />
        </>
    );
};

export default App;
