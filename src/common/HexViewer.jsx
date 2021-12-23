import React, { useMemo, useState } from 'react';

// IDEA: transform byte div into input to make the data editable

const mappers = {
    hex: (buffer) => Array.from(buffer).map((byte) => [byte.toString(16).padStart(2, 0), byte === 0]),
    dec: (buffer) => Array.from(buffer).map((byte) => [byte.toString(10), byte === 0]),
    chr: (buffer) => Array.from(buffer).map((byte) => /\P{C}/u.test(String.fromCodePoint(byte)) ? [String.fromCodePoint(byte), false] : ['.', true]),
};

export const HexViewer = ({ buffer, className = '' }) => {
    const [mode, setMode] = useState('hex');
    const [hover, setHover] = useState(null);
    const padding = useMemo(() => Math.ceil(Math.log(buffer.length) / Math.log(16)), [buffer.length]);
    const mapped = useMemo(() => mappers[mode](buffer), [mode, buffer]);

    return (
        <div className={`grid overflow-auto ${className}`} style={{ gridTemplate: '"select head" 0fr "left data" auto / 0fr auto' }}>
            <select style={{ gridArea: 'select' }} className="sticky top-0 outline-none border-r bg-transparent backdrop-filter backdrop-blur shadow" value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="hex">Hex.</option>
                <option value="dec">Dec.</option>
                <option value="chr">ASCII</option>
            </select>
            <div style={{ gridArea: 'head' }} className="sticky top-0 grid grid-cols-16 bg-transparent backdrop-filter backdrop-blur shadow">
                {Array.from({ length: 16 }, (v, n) => n).map((offset) => (
                    <div key={offset} className={`p-1 ${hover !== null && hover % 16 === offset ? 'bg-green-700 text-white' : ''} text-center font-bold`}>
                        {offset.toString(16)}
                    </div>
                ))}
            </div>
            <div style={{ gridArea: 'left' }} className="grid grid-cols-1 items-center border-r" >
                {Array.from({ length: Math.ceil(buffer.length / 16) }, (v, n) => n * 16).map((offset) => (
                    <div key={offset} className={`p-1 ${hover !== null && Math.floor(hover / 16) === Math.floor(offset / 16) ? 'bg-green-700 text-white' : ''} text-center font-bold`}>
                        {offset.toString(16).padStart(padding, 0)}
                    </div>
                ))}
            </div>
            <div style={{ gridArea: 'data' }} className="grid grid-cols-16 place-items-center">
                {mapped.map(([byte, disabled], offset) => (
                    <div
                        key={offset}
                        className={`p-1 hover:text-green-700 ${disabled ? 'text-gray-400' : ''}`}
                        title={'0x' + offset.toString(16).padStart(padding, 0)}
                        onMouseEnter={() => setHover(offset)}
                        onMouseLeave={() => setHover(null)}
                    >
                        {byte}
                    </div>
                ))}
            </div>
        </div>
    );
};
