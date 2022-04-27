import React, { Fragment } from 'react';
import { useDebug } from '@kabukki/wasm-chip8';
import { prefix } from 'metric-prefix';

import { hex } from '../../../../utils';
import { Byte } from '../../../../common';

export const Cpu = () => {
    const { emulator } = useDebug();

    if (emulator) {
        return (
            <div className="grid grid-cols-2 divide-x">
                <div className="divide-y">
                    <div className="p-2 grid grid-cols-2 gap-x-2 items-center">
                        <b className="col-span-2">General</b>
                        <span>Program counter</span>
                        <div className="font-mono">
                            <Byte value={emulator.cpu.pc} format={hex.with({ padding: 3 })} /> ({emulator.memory.disassembly[emulator.cpu.pc / 2]?.string})
                        </div>
                        <span>Delay timer</span>
                        <Byte value={emulator.cpu.dt} />
                        <span>Sound timer</span>
                        <Byte value={emulator.cpu.st} />
                    </div>
                    <div className="p-2 grid grid-cols-2 sm:grid-cols-4 gap-x-2 items-center">
                        <b className="col-span-2 sm:col-span-4">Registers</b>
                        {Array.from(emulator.cpu.v).map((data, n) => (
                            <Fragment key={n}>
                                <b>V{n.toString(16).toUpperCase()}</b>
                                <Byte value={data} format={hex.with({ padding: 2 })} />
                            </Fragment>
                        ))}
                        <b>I</b>
                        <Byte value={emulator.cpu.i} format={hex.with({ padding: 3 })} />
                    </div>
                </div>
                <div className="divide-y">
                    <div className="p-2 grid grid-cols-2 gap-x-2 items-center">
                        <b className="col-span-2">Timing</b>
                        <span>CPU</span>
                        <span className="font-mono">{emulator.cpu.cycles.toLocaleString()} cycles @ {prefix(emulator.cpu.rate, { unit: 'Hz' })}</span>
                        <span>Timers</span>
                        <span className="font-mono">{emulator.cpu.cycles_timer.toLocaleString()} cycles @ {prefix(emulator.cpu.rate_timer, { unit: 'Hz' })}</span>
                    </div>
                    <div className="p-2">
                        <b>Stack</b>
                        {Array.from(emulator.cpu.stack).map((data, n) => (
                            <div key={n} className="font-mono">
                                <Byte key={n} value={data} format={hex.with({ padding: 3 })} />
                                {emulator.cpu.sp === n && <span className="text-green-700"> ← stack pointer</span>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    } else {
        return <p className="p-2 text-center">No data :(</p>
    }
};
