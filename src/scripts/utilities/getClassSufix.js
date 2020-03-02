const getClassSuffix = (amount, quota, className) => {
    // Calculate how much perecent of masks left
    const rate = Math.round((amount / quota) * 100);

    // Assign classes to markers
    switch (true) {
        case (rate >= 25):
            return className;
        case (rate >= 5):
            return `${className} ${className}--caution`;
        default:
            return `${className} ${className}--insufficient`;
    }
};

export default getClassSuffix;
