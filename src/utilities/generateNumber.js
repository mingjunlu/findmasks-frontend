const generateNumber = (a, b) => {
    const isNumber = (n) => (typeof n === 'number');
    if (!isNumber(a) || !isNumber(b)) {
        throw new Error('Arguments "a" and "b" must be numbers');
    }
    if (a > b) {
        throw new Error('Argument "a" must be less than or equal to "b"');
    }

    const min = Math.ceil(a);
    const max = Math.floor(b);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default generateNumber;
