import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

const isProduction = (process.env.NODE_ENV === 'production');

const usePageView = () => {
    const {
        hash,
        pathname,
        search,
        state: locationState,
    } = useLocation();

    useEffect(() => {
        if (!isProduction) { return; }

        const hasPlaceName = (locationState && locationState.placeName);
        const title = hasPlaceName ? `${locationState.placeName} | 口罩咧？` : document.title;

        const page = `${pathname}${search}${hash}`;
        ReactGA.pageview(page, undefined, title);
    }, [hash, pathname, search, locationState]);
};

export default usePageView;
