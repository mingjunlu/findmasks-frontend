import { useEffect } from 'react';

const ResetTitle = () => {
    useEffect(() => {
        const siteName = '口罩咧？';
        if (document.title !== siteName) {
            document.title = siteName;
        }
    }, []);
    return null;
};

export default ResetTitle;
