import React, { useMemo, useState } from 'react';

export const HexViewer = ({ buffer }) => {
    const [mode, setMode] = useState('hex');
    const [hover, setHover] = useState(null);
    
    const hex = useMemo(() => Array.from(buffer).map((byte) => [byte.toString(16).padStart(2, 0), byte === 0]), [buffer]);
    const decimal = useMemo(() => Array.from(buffer).map((byte) => [byte.toString(10), byte === 0]), [buffer]);
    const char = useMemo(() => Array.from(buffer).map((byte) => /\P{C}/u.test(String.fromCodePoint(byte)) ? [String.fromCodePoint(byte), false] : ['.', true]), [buffer]);
    const padding = useMemo(() => Math.ceil(Math.log(buffer.length) / Math.log(16)), [buffer]);
    
    const mapped = (mode === 'hex' ? hex : mode === 'decimal' ? decimal : mode === 'char' ? char : null);

    return (
        <div className="grid" style={{ gridTemplate: '"select head" 0fr "left data" auto / 0fr auto' }}>
            <select style={{ gridArea: 'select' }} className="outline-none border-b border-r" value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="hex">Hex</option>
                <option value="decimal">Dec</option>
                <option value="char">Chr</option>
            </select>
            <div style={{ gridArea: 'head' }} className="grid grid-cols-16 border-b">
                {Array.from({ length: 16 }, (v, n) => n).map((offset) => (
                    <div
                        key={offset}
                        className={`p-1 bg-${hover !== null && hover % 16 === offset ? 'green-100' : 'white'} text-center font-bold`}
                    >
                        {offset.toString(16)}
                    </div>
                ))}
            </div>
            <div style={{ gridArea: 'left' }} className="border-r" >
                {Array.from({ length: Math.ceil(buffer.length / 16) }, (v, n) => n * 16).map((offset) => (
                    <div
                        key={offset}
                        className={`p-1 bg-${hover !== null && Math.floor(hover / 16) === Math.floor(offset / 16) ? 'green-100' : 'white'} text-center font-bold`}
                    >
                        {offset.toString(16).padStart(padding, 0)}
                    </div>
                ))}
            </div>
            <div style={{ gridArea: 'data' }} className="grid grid-cols-16 bg-gray-200">
                {mapped.map(([byte, disabled], offset) => (
                    <div
                        key={offset}
                        className={`p-1 grid-area text-center bg-white hover:text-green-400 text-${disabled ? 'gray-200' : 'current'}`}
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
