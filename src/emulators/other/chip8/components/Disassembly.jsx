import React, { memo, useMemo } from 'react';
import { FixedSizeList } from 'react-window';
import { useDebug } from '@kabukki/wasm-chip8';
import useSize from '@react-hook/size';
import classNames from 'classnames';
import colors from 'tailwindcss/colors';

import { hex } from '../../../../utils';
import { useRef } from 'react';

const sections = [
    { start: 0x0000, end: 0x01ff, name: 'Reserved', color: colors.yellow[500] },
    { start: 0x0200, end: 0x0fff, name: 'Program', color: colors.green[500] },
];

export const Disassembly = ({ className }) => {
    const ref = useRef();
    const { cpu, memory } = useDebug();
    const [width, height] = useSize(ref);

    return (
        <div ref={ref} className={className}>
            {memory ? (
                <FixedSizeList width={width} height={height} itemCount={memory?.disassembly.length} itemSize={24}>
                    {({ index, style }) => {
                        const disassembly = memory.disassembly[index];

                        const section = useMemo(() => {
                            return sections.find(({ start, end }) => disassembly.address >= start && disassembly.address < end) || null;
                        }, [index]);

                        return (
                            <div style={style} className={classNames('flex items-center gap-4 font-mono', { 'bg-green-200': cpu.pc === disassembly.address })}>
                                <div className="w-4 self-stretch" style={{ backgroundColor: section.color }} title={section.name} />
                                <b>{hex(disassembly.address, { padding: 3, prefix: false })}</b>
                                <span className="text-gray-500">{disassembly.opcode}</span>
                                {disassembly.string}
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
