const isObject = (value) => {
    const isTruthy = !!value;
    if (!isTruthy) { return false; }

    const isTypeOfObject = (typeof value === 'object');
    if (!isTypeOfObject) { return false; }

    const hasObjectConstructor = (value.constructor === Object);
    if (!hasObjectConstructor) { return false; }

    return true;
};

module.exports = isObject;
