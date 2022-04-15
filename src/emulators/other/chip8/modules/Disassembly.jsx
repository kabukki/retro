import React, { useMemo } from 'react';
import { FixedSizeList } from 'react-window';
import { useDebug } from '@kabukki/wasm-chip8';
import { withParentSize } from '@visx/responsive';
import classNames from 'classnames';
import colors from 'tailwindcss/colors';

const sections = [
    { start: 0x0000, end: 0x01ff, name: 'Reserved', color: colors.yellow[500] },
    { start: 0x0200, end: 0x0fff, name: 'Program', color: colors.green[500] },
];

const List = withParentSize(({ parentWidth, parentHeight, className }) => {
    const { cpu, memory } = useDebug();

    const Row = ({ index, style }) => {
        const disassembly = memory.disassembly[index];

        const section = useMemo(() => {
            return sections.find(({ start, end }) => disassembly.address >= start && disassembly.address < end) || null;
        }, [index]);

        return (
            <div className={classNames('flex items-center gap-4 font-mono', { 'bg-green-200': cpu.pc === disassembly.address }, className)} style={style}>
                <div className="w-4 self-stretch" style={{ backgroundColor: section.color }} title={section.name} />
                <b>{disassembly.address.toString(16).padStart(4, 0)}</b>
                <span className="text-gray-500">{disassembly.opcode}</span>
                {disassembly.string}
            </div>
        );
    };

    return (
        <FixedSizeList width={parentWidth} height={parentHeight} itemCount={memory.disassembly.length} itemSize={20}>
            {Row}
        </FixedSizeList>
    );
});

export const Disassembly = () => (
    <List className="flex-1"/>
);
