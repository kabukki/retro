import classNames from 'classnames';
import React, { useMemo, useState } from 'react';

import { Byte } from '.';

// IDEA: transform byte div into input to make the data editable

const mappers = {
    hex: {
        format: (byte) => byte.toString(16).padStart(2, 0),
        isDisabled: (byte) => byte === 0,
    },
    dec: {
        format: (byte) => byte.toString(10),
        isDisabled: (byte) => byte === 0,
    },
    chr: {
        format: (byte) => /\P{C}/u.test(String.fromCodePoint(byte)) ? String.fromCodePoint(byte) : '.',
        isDisabled: (byte) => !/\P{C}/u.test(String.fromCodePoint(byte)),
    },
};

export const HexViewer = ({ buffer, className = '' }) => {
    const [mode, setMode] = useState('hex');
    const padding = useMemo(() => Math.ceil(Math.log(buffer.length) / Math.log(16)), [buffer.length]);

    return (
        <div className={classNames(className, 'grid')} style={{ gridTemplate: '"select head" 0fr "left data" auto / 0fr auto' }}>
            <select className="[grid-area:select] outline-none border-r shadow" value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="hex">Hex.</option>
                <option value="dec">Dec.</option>
                <option value="chr">ASCII</option>
            </select>
            <div className="[grid-area:head] grid grid-cols-16 shadow">
                {Array.from({ length: 16 }, (v, n) => n).map((offset) => (
                    <div key={offset} className="p-1 text-center font-bold">
                        {offset.toString(16)}
                    </div>
                ))}
            </div>
            <div className="[grid-area:left] grid grid-cols-1 items-center border-r" >
                {Array.from({ length: Math.ceil(buffer.length / 16) }, (v, n) => n * 16).map((offset) => (
                    <div key={offset} className="p-1 text-center font-bold">
                        {offset.toString(16).padStart(padding, 0)}
                    </div>
                ))}
            </div>
            <div className="[grid-area:data] grid grid-cols-16 place-items-center">
                {Array.from(buffer).map((byte, offset) => (
                    <Byte
                        key={offset}
                        value={byte}
                        format={mappers[mode].format}
                        isDisabled={mappers[mode].isDisabled}
                        className="p-1 hover:text-green-700"
                        title={'0x' + offset.toString(16).padStart(padding, 0)}
                    />
                ))}
            </div>
        </div>
    );
};
