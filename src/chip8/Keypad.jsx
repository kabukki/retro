import React from 'react';

export const Keypad = ({ onKeydown, onKeyup }) => {
    const digit = 'h-1 p-1 border border-gray-500 cursor-pointer';
    const letter = [digit, 'bg-gray-100'].join(' ');
    const listeners = (key) => ({ onMouseDown: () => onKeydown(key), onMouseUp: () => onKeyup(key) });

    return (
        <table className="table-fixed">
            <tbody>
                <tr>
                    <td className={digit} {...listeners(0x1)}>1</td>
                    <td className={digit} {...listeners(0x2)}>2</td>
                    <td className={digit} {...listeners(0x3)}>3</td>
                    <td className={letter} {...listeners(0xC)}>C</td>
                </tr>
                <tr>
                    <td className={digit} {...listeners(0x4)}>4</td>
                    <td className={digit} {...listeners(0x5)}>5</td>
                    <td className={digit} {...listeners(0x6)}>6</td>
                    <td className={letter} {...listeners(0xD)}>D</td>
                </tr>
                <tr>
                    <td className={digit} {...listeners(0x7)}>7</td>
                    <td className={digit} {...listeners(0x8)}>8</td>
                    <td className={digit} {...listeners(0x9)}>9</td>
                    <td className={letter} {...listeners(0xE)}>E</td>
                </tr>
                <tr>
                    <td className={letter} {...listeners(0xA)}>A</td>
                    <td className={digit} {...listeners(0x0)}>0</td>
                    <td className={letter} {...listeners(0xB)}>B</td>
                    <td className={letter} {...listeners(0xF)}>F</td>
                </tr>
            </tbody>
        </table>
    );
};
