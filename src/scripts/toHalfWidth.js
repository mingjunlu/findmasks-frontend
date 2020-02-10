const toHalfWidth = (value) => value
    .replace(/[\uff01-\uff5e]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0))
    .replace(/\u3000/g, '\u0020');

export default toHalfWidth;
