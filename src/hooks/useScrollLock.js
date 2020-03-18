import { useLayoutEffect } from 'react';

const useScrollLock = (shouldLock = true) => {
    useLayoutEffect(() => {
        // Reserve original style values
        const { body } = document;
        const hadInlineStyle = !!body.getAttribute('style');
        const { overflow: overflowValue } = window.getComputedStyle(body);

        // Prevent scrolling on mount
        if (shouldLock) {
            body.style.overflow = 'hidden';
        }

        // Enable scrolling on unmount
        return () => {
            if (!hadInlineStyle) {
                body.removeAttribute('style');
            } else {
                body.style.overflow = overflowValue;
            }
        };
    }, [shouldLock]);
};

export default useScrollLock;
