export const hex = (num, padding = 4) => `0x${num.toString(16).padStart(padding, '0')}`;

/**
 * Credits: https://gist.github.com/jlbruno/1535691/db35b4f3af3dcbb42babc01541410f291a8e8fac
 * @param {*} n 
 */
export const formatOrdinal = (n) => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
};
