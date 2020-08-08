import getQuantile from './getQuantile';

const colors = {
    sufficient: 'rgb(17, 120, 122)',
    acceptable: 'rgb(230, 126, 34)',
    insufficient: 'rgb(142, 142, 147)',
};

const getCardColor = (amount, sortedArray) => {
    const firstQuarter = getQuantile(sortedArray, 0.25);
    const secondQuarter = getQuantile(sortedArray, 0.5);

    if (amount >= secondQuarter) {
        return colors.sufficient;
    }
    if (amount >= firstQuarter) {
        return colors.acceptable;
    }
    return colors.insufficient;
};

export default getCardColor;
