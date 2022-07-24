import React, { useRef, useContext, useMemo } from 'react';
import { FixedSizeList } from 'react-window';
import useSize from '@react-hook/size';
import classNames from 'classnames';
import colors from 'tailwindcss/colors';

import { Byte } from '../../../../common';
import { hex } from '../../../../utils';
import { EmulatorContext } from '../context';

const regions = [
    { start: 0x0000, end: 0x1FFF, name: 'RAM', color: colors.red[500] },
    { start: 0x2000, end: 0x3FFF, name: 'PPU', color: colors.blue[500] },
    { start: 0x4000, end: 0x401F, name: 'APU & I/O', color: colors.yellow[500] },
    { start: 0x4020, end: 0x5FFF, name: 'Expansion ROM', color: colors.green[500] },
    { start: 0x6000, end: 0x7FFF, name: 'PRG-RAM', color: colors.purple[500] },
    { start: 0x8000, end: 0xFFFF, name: 'PRG-ROM', color: colors.orange[500] },
];

const Row = ({ index, style }) => {
    const { emulator } = useContext(EmulatorContext);
    const offset = index * 16;
    const data = Array.from(emulator.debug.bus.at(offset));

    const region = useMemo(() => {
        return regions.find(({ start, end }) => offset >= start && offset < end) || null;
    }, [offset]);

    return (
        <div style={style} className={classNames('flex items-center gap-2 font-mono')}>
            <div className="p-2 self-stretch" style={{ backgroundColor: region.color }} title={region.name} />
            <div key={offset} className="p-1 text-center font-bold">
                {(offset).toString(16).padStart(4, 0)}
            </div>
            {data.map((byte, n) => byte !== null ? (
                <Byte
                    key={n}
                    value={byte}
                    format={hex.with({ padding: 2, prefix: false })}
                    className="p-1 hover:text-green-700"
                    title={'0x' + (offset + n).toString(16).padStart(4, 0)}
                />
            ) : (
                <span key={n} className="p-1 text-red-700">??</span>
            ))}
            <div>
                {data.map((byte) => /\P{C}/u.test(String.fromCodePoint(byte)) ? (
                    <span>{String.fromCodePoint(byte)}</span>
                ) : (
                    <span className={byte !== null ? 'text-neutral-400' : 'text-red-700'}>.</span>
                ))}
            </div>
        </div>
    );
};

export const Memory = () => {
    const ref = useRef();
    const list = useRef();
    const { emulator } = useContext(EmulatorContext);
    const [width, height] = useSize(ref);

    const onJump = (address) => {
        list.current.scrollToItem(address / 16, 'start');
    };

    return emulator?.debug ? (
        <div className="h-full flex flex-col divide-y">
            <div className="flex divide-x">
                <div className="p-2 flex gap-2 justify-center items-center">
                    Jump to
                    <select className="border rounded" onChange={(e) => onJump(e.target.value)}>
                        {regions.map(({ name, start }) => <option key={start} value={start}>{name}</option>)}
                    </select>
                </div>
            </div>
            <div ref={ref} className="h-0 flex-1">
                <FixedSizeList ref={list} width={width} height={height} itemCount={0xFFFF / 16} itemSize={24}>
                    {Row}
                </FixedSizeList>
            </div>
        </div>
    ) : (
        <p className="h-full flex items-center justify-center">No data :(</p>
    );
};
