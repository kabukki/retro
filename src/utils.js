export const hex = (num, padding = 4) => `0x${num.toString(16).padStart(padding, '0')}`;
