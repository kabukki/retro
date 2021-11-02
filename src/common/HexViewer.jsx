import React, { useMemo, useState } from 'react';

const mappers = {
    hex: (buffer) => Array.from(buffer).map((byte) => [byte.toString(16).padStart(2, 0), byte === 0]),
    decimal: (buffer) => Array.from(buffer).map((byte) => [byte.toString(10), byte === 0]),
    char: (buffer) => Array.from(buffer).map((byte) => /\P{C}/u.test(String.fromCodePoint(byte)) ? [String.fromCodePoint(byte), false] : ['.', true]),
};

export const HexViewer = React.memo(({ buffer }) => {
    const [mode, setMode] = useState('hex');
    const [hover, setHover] = useState(null);
    const padding = useMemo(() => Math.ceil(Math.log(buffer.length) / Math.log(16)), [buffer.length]);
    
    const mapped = mappers[mode](buffer);

    return (
        <div className="grid" style={{ gridTemplate: '"select head" 0fr "left data" auto / 0fr auto' }}>
            <select style={{ gridArea: 'select' }} className="bg-transparent outline-none border-b border-r" value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="hex">HEX</option>
                <option value="decimal">DEC</option>
                <option value="char">CHR</option>
            </select>
            <div style={{ gridArea: 'head' }} className="grid grid-cols-16 border-b">
                {Array.from({ length: 16 }, (v, n) => n).map((offset) => (
                    <div
                        key={offset}
                        className={`p-1 bg-${hover !== null && hover % 16 === offset ? 'green-700' : 'transparent'} text-center font-bold`}
                    >
                        {offset.toString(16)}
                    </div>
                ))}
            </div>
            <div style={{ gridArea: 'left' }} className="border-r" >
                {Array.from({ length: Math.ceil(buffer.length / 16) }, (v, n) => n * 16).map((offset) => (
                    <div
                        key={offset}
                        className={`p-1 bg-${hover !== null && Math.floor(hover / 16) === Math.floor(offset / 16) ? 'green-700' : 'transparent'} text-center font-bold`}
                    >
                        {offset.toString(16).padStart(padding, 0)}
                    </div>
                ))}
            </div>
            <div style={{ gridArea: 'data' }} className="grid grid-cols-16">
                {mapped.map(([byte, disabled], offset) => (
                    <div
                        key={offset}
                        className={`p-1 grid-area text-center hover:text-green-700 text-${disabled ? 'white text-opacity-25' : 'current'}`}
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
}, (previous, props) => previous.buffer == props.buffer);
