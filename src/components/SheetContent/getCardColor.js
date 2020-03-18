const getCardColor = (amount, quota) => {
    // Calculate how much perecent of masks left
    const rate = Math.round((amount / quota) * 100);

    // Define colors
    const colors = {
        sufficient: 'rgb(17, 120, 122)',
        acceptable: 'rgb(230, 126, 34)',
        insufficient: 'rgb(142, 142, 147)',
    };

    // Decide which color to return
    switch (true) {
        case (rate >= 25):
            return colors.sufficient;
        case (rate >= 5):
            return colors.acceptable;
        default:
            return colors.insufficient;
    }
};

export default getCardColor;
