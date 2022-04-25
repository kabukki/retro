import React, { Fragment } from 'react';
import { useDebug } from '@kabukki/wasm-chip8';

import { hex } from '../../../../utils';
import { Byte } from '../../../../common';

export const Cpu = () => {
    const { emulator } = useDebug();

    if (emulator) {
        return (
            <div className="grid grid-cols-3 divide-x">
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
                        <Byte value={emulator.cpu.i} format={hex} />
                    </div>
                </div>
                <div className="p-2">
                    <b>Stack</b>
                    <span className="font-mono">
                        {Array.from(emulator.cpu.stack).map((data, n) => (
                            <div key={n}>
                                <Byte key={n} value={data} format={hex.with({ padding: 3 })} />
                                {emulator.cpu.sp === n && <span className="text-green-700"> ← stack pointer</span>}
                            </div>
                        ))}
                    </span>
                </div>
                <div className="p-2">
                    <b>Trace</b>
                    <p>Todo</p>
                </div>
            </div>
        );
    } else {
        return <p className="p-2 text-center">No data :(</p>
    }
};
