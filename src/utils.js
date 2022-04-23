export const hex = (num, { prefix = true, padding = 4 } = {}) => `${prefix ? '0x' : ''}${num.toString(16).padStart(padding, '0')}`;
// Small curry helper
hex.with = (options) => (num) => hex(num, options);

/**
 * Credits: https://gist.github.com/jlbruno/1535691/db35b4f3af3dcbb42babc01541410f291a8e8fac
 * @param {*} n 
 */
export const formatOrdinal = (n) => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
};
