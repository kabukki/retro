import React, { useRef, useMemo } from 'react';
import useSize from '@react-hook/size';
import { FixedSizeList } from 'react-window';

import { Byte } from '.';
import { hex } from '../utils';

// IDEA: transform byte div into input to make the data editable

const format = {
    hex: hex.with({ padding: 2, prefix: false }),
    chr: (byte) => /\P{C}/u.test(String.fromCodePoint(byte)) ? String.fromCodePoint(byte) : '.',
};

export const HexViewer = ({ buffer = [], className = '' }) => {
    const ref = useRef();
    const [width, height] = useSize(ref);
    const padding = useMemo(() => Math.ceil(Math.log(buffer.length) / Math.log(16)), [buffer.length]);

    return (
        <div ref={ref} className={className}>
            <FixedSizeList
                width={width}
                height={height}
                itemCount={Math.ceil(buffer.length / 16)}
                itemSize={24}
            >
                {({ index, style }) => {
                    const offset = 16 * index;
                    const slice = Array.from(buffer.slice(offset, offset + 16));

                    return (
                        <div className="flex items-center gap-4 font-mono" style={style}>
                            <div key={offset} className="p-1 text-center font-bold">
                                {offset.toString(16).padStart(padding, 0)}
                            </div>
                            {slice.map((byte, n) => (
                                <Byte
                                    key={n}
                                    value={byte}
                                    format={format.hex}
                                    className="p-1 hover:text-green-700"
                                    title={'0x' + (offset + n).toString(16).padStart(padding, 0)}
                                />
                            ))}
                            {slice.map(format.chr)}
                        </div>
                    );
                }}
            </FixedSizeList>
        </div>
    );
};
