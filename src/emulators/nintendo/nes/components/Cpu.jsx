import React, { useRef, useContext } from 'react';
import { FixedSizeList } from 'react-window';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { CpuStatusFlag } from '@kabukki/wasm-nes';
import useSize from '@react-hook/size';
import classNames from 'classnames';

import { hex } from '../../../../utils';
import { Byte } from '../../../../common';
import { EmulatorContext } from '../context';
import { Flags } from './Flags';

const Row = ({ index, style }) => {
    const { emulator } = useContext(EmulatorContext);
    const address = emulator.debug.disassembly.index_to_address(index);
    const disassembly = emulator.debug.disassembly.at(address);

    return (
        <div style={style} className={classNames('flex items-center gap-4 font-mono', { 'bg-green-200': emulator.debug.cpu.pc === disassembly.address })}>
            <b>{disassembly.bank.toString().padStart(2, 0)}:{hex(disassembly.address, { padding: 4, prefix: false })}</b>
            <span className="text-neutral-400">{disassembly.bytes}</span>
            {disassembly.operator} {disassembly.operand}
        </div>
    );
};

export const Cpu = () => {
    const ref = useRef();
    const list = useRef();
    const { emulator } = useContext(EmulatorContext);
    const [width, height] = useSize(ref);

    const onJump = (address) => {
        const index = emulator.debug.disassembly.address_to_index(address);
        list.current.scrollToItem(index, 'center');
    };

    return emulator?.debug ? (
        <div className="h-full grid grid-rows-3 divide-y md:grid-cols-3 md:grid-rows-1 md:divide-x md:divide-y-0">
            <div className="flex flex-col divide-y">
                <h2 className="p-2 font-bold">PRG-ROM</h2>
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
                    <span>Cycles until next instruction</span>
                    <span className="font-mono">{emulator.debug.cpu.cycles?.toLocaleString()}</span>
                    <span>Interrupt</span>
                    <span className="font-mono">{emulator.debug.cpu.interrupt || '-'}</span>
                    <span>A</span>
                    <Byte value={emulator.debug.cpu.a} format={hex.with({ padding: 2 })} />
                    <span>X</span>
                    <Byte value={emulator.debug.cpu.x} format={hex.with({ padding: 2 })} />
                    <span>Y</span>
                    <Byte value={emulator.debug.cpu.y} format={hex.with({ padding: 2 })} />
                    <span>Status</span>
                    <div className="flex gap-2 font-mono">
                        <Byte value={emulator.debug.cpu.status} format={hex.with({ padding: 2 })} />
                        <Flags bits={[
                            { name: 'N', description: 'Negative', enabled: (emulator.debug.cpu.status & CpuStatusFlag.Negative) > 0 },
                            { name: 'V', description: 'Overflow', enabled: (emulator.debug.cpu.status & CpuStatusFlag.Overflow) > 0 },
                            { name: 's', enabled: (emulator.debug.cpu.status & CpuStatusFlag.Unused) > 0 },
                            { name: 's', enabled: (emulator.debug.cpu.status & CpuStatusFlag.Break) > 0 },
                            { name: 'D', description: 'Decimal', enabled: (emulator.debug.cpu.status & CpuStatusFlag.Decimal) > 0 },
                            { name: 'I', description: 'Interrupt disable', enabled: (emulator.debug.cpu.status & CpuStatusFlag.DisableInterrupt) > 0 },
                            { name: 'Z', description: 'Zero', enabled: (emulator.debug.cpu.status & CpuStatusFlag.Zero) > 0 },
                            { name: 'C', description: 'Carry', enabled: (emulator.debug.cpu.status & CpuStatusFlag.Carry) > 0 },
                        ]} />
                    </div>
                    <span>Stack pointer</span>
                    <Byte value={emulator.debug.cpu.y} format={hex.with({ padding: 2 })} />
                    <span>DMA</span>
                    <span>{emulator.debug.bus.dma?.page ?? '-'}</span>
                </div>
            </div>
            <div className="flex flex-col divide-y">
                <h2 className="p-2 font-bold">Stack</h2>
                <div className="p-2 h-0 flex-1 overflow-auto">
                    {Array.from(emulator.debug.bus.stack || []).map((data, n) => (
                        <div key={n} className="flex gap-4 font-mono">
                            <b>{hex(n, { padding: 2, prefix: false })}</b>
                            <Byte key={n} value={data} format={hex.with({ padding: 2 })} />
                            {emulator.debug.cpu.sp === + n && <span className="text-green-700">← stack pointer</span>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ) : (
        <p className="h-full flex items-center justify-center">No data :(</p>
    );
};
