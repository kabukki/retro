import React, { Fragment, useRef, useContext, useMemo } from 'react';
import { FixedSizeList } from 'react-window';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import useSize from '@react-hook/size';
import classNames from 'classnames';
import colors from 'tailwindcss/colors';

import { hex } from '../../../../utils';
import { Byte } from '../../../../common';
import { EmulatorContext } from '../context';

const regions = [
    { start: 0x000, end: 0x1ff, name: 'Reserved', color: colors.yellow[500] },
    { start: 0x200, end: 0xfff, name: 'Program', color: colors.green[500] },
];

const Row = ({ index, style }) => {
    const { emulator } = useContext(EmulatorContext);
    const address = emulator.debug.disassembly.indexToAddress(index);
    const disassembly = emulator.debug.disassembly.at(address);

    const region = useMemo(() => {
        return regions.find(({ start, end }) => address >= start && address < end) || null;
    }, [address]);

    return (
        <div style={style} className={classNames('flex items-center gap-4 font-mono', { 'bg-green-200': emulator.debug.cpu.pc === disassembly.address })}>
            <div className="w-4 self-stretch" style={{ backgroundColor: region.color }} title={region.name} />
            <b>{hex(disassembly.address, { padding: 3, prefix: false })}</b>
            <span className="text-neutral-400">{hex(disassembly.opcode, { padding: 4, prefix: false })}</span>
            {disassembly.disassembly}
        </div>
    );
};

export const Cpu = () => {
    const ref = useRef();
    const list = useRef();
    const { emulator } = useContext(EmulatorContext);
    const [width, height] = useSize(ref);

    const onJump = (address) => {
        const index = emulator.debug.disassembly.addressToIndex(address);
        list.current.scrollToItem(index, 'center');
    };

    return emulator?.debug ? (
        <div className="h-full grid grid-rows-3 divide-y md:grid-cols-3 md:grid-rows-1 md:divide-x md:divide-y-0">
            <div className="flex flex-col divide-y">
                <h2 className="p-2 font-bold">Disassembly</h2>
                <div ref={ref} className="h-0 flex-1">
                    <FixedSizeList ref={list} width={width} height={height} itemCount={emulator.debug.disassembly?.total} itemSize={24}>
                        {Row}
                    </FixedSizeList>
                </div>
            </div>
            <div className="flex flex-col divide-y">
                <h2 className="p-2 font-bold">CPU</h2>
                <div className="p-2 grid grid-cols-2 gap-x-2 items-center overflow-auto">
                    <span>Program counter</span>
                    <div className="flex gap-2 font-mono">
                        <Byte value={emulator.debug.cpu.pc} format={hex.with({ padding: 3 })} />
                        <button className="text-green-700" title="Jump to program counter" onClick={() => onJump(emulator.debug.cpu.pc)}>
                            <FontAwesomeIcon  className="w-4 fill-green-700" icon={faArrowRightToBracket} />
                        </button>
                    </div>
                    <span>Delay timer</span>
                    <Byte value={emulator.debug.cpu.dt} />
                    <span>Sound timer</span>
                    <Byte value={emulator.debug.cpu.st} />
                    {Array.from(emulator.debug.cpu.v || []).map((data, n) => (
                        <Fragment key={n}>
                            <span>V{n.toString(16).toUpperCase()}</span>
                            <Byte value={data} format={hex.with({ padding: 2 })} />
                        </Fragment>
                    ))}
                    <span>I</span>
                    <Byte value={emulator.debug.cpu.i} format={hex.with({ padding: 3 })} />
                    <span>Stack pointer</span>
                    <Byte value={emulator.debug.cpu.sp} format={hex.with({ padding: 2 })} />
                </div>
            </div>
            <div className="flex flex-col divide-y">
                <h2 className="p-2 font-bold">Stack</h2>
                <div className="p-2 h-0 flex-1 overflow-auto">
                    {Array.from(emulator.debug.cpu.stack || []).map((data, n) => (
                        <div key={n} className="flex gap-4 font-mono">
                            <b>{hex(n, { padding: 2, prefix: false })}</b>
                            <Byte key={n} value={data} format={hex.with({ padding: 2 })} />
                            {emulator.debug.cpu.sp === n && <span className="text-green-700">← stack pointer</span>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ) : (
        <p className="p-2 text-center">No data :(</p>
    );
};
