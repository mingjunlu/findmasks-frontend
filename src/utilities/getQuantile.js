const getQuantile = (sortedArray, percentage) => {
    const position = (sortedArray.length - 1) * percentage;
    const base = Math.floor(position);
    const rest = position - base;

    if (sortedArray[base + 1] !== undefined) {
        return sortedArray[base] + rest * (sortedArray[base + 1] - sortedArray[base]);
    }

    return sortedArray[base];
};

export default getQuantile;
