import React, { useMemo, useRef } from 'react';
import { FixedSizeList } from 'react-window';
import { useDebug } from '@kabukki/wasm-chip8';
import useSize from '@react-hook/size';
import classNames from 'classnames';
import colors from 'tailwindcss/colors';

import { hex } from '../../../../utils';

const regions = [
    { start: 0x000, end: 0x1ff, name: 'Reserved', color: colors.yellow[500] },
    { start: 0x200, end: 0xfff, name: 'Program', color: colors.green[500] },
];

export const Disassembly = () => {
    const ref = useRef();
    const { emulator } = useDebug();
    const [width, height] = useSize(ref);

    return (
        <div ref={ref} className="h-full w-full">
            {emulator ? (
                <FixedSizeList width={width} height={height} itemCount={emulator.memory?.disassembly.length} itemSize={24}>
                    {({ index, style }) => {
                        const [address, instruction] = emulator.memory.disassembly[index];

                        const region = useMemo(() => {
                            return regions.find(({ start, end }) => address >= start && address < end) || null;
                        }, [address]);

                        return (
                            <div style={style} className={classNames('flex items-center gap-4 font-mono', { 'bg-green-200': emulator.cpu.pc === address })}>
                                <div className="w-4 self-stretch" style={{ backgroundColor: region.color }} title={region.name} />
                                <b>{hex(address, { padding: 3, prefix: false })}</b>
                                <span className="text-gray-500">{hex(instruction.opcode, { padding: 4, prefix: false })}</span>
                                {instruction.disassembly}
                            </div>
                        );
                    }}
                </FixedSizeList>
            ) : (
                <p className="p-2 text-center">No data :(</p>
            )}
        </div>
    );
};
