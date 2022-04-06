import React, { Fragment } from 'react';
import { useStatus } from '@kabukki/wasm-chip8';

import { hex } from '../../../../utils';
import { Byte } from '../../../../common';

export const Cpu = () => {
    const { cpu } = useStatus();

    if (cpu) {
        return (
            <div className="divide-y">
                <div className="p-2 grid grid-cols-2 gap-x-2 items-center">
                    <b className="col-span-2">General</b>
                    <span>Program counter</span>
                    <Byte value={cpu.pc} format={hex} />
                    <span>Delay timer</span>
                    <Byte value={cpu.dt} />
                    <span>Sound timer</span>
                    <Byte value={cpu.st} />
                    {/* instruction: {disassembly[cpu.pc]} */}
                </div>
                <div className="p-2 grid grid-cols-4 gap-x-2 items-center">
                    <b className="col-span-4">Registers</b>
                    {Array.from(cpu.v).map((data, n) => (
                        <Fragment key={n}>
                            <b>V{n.toString(16).toUpperCase()}</b>
                            <Byte value={data} format={data => hex(data, 2)} />
                        </Fragment>
                    ))}
                    <b>I</b>
                    <Byte value={cpu.i} format={hex} />
                </div>
                <div className="p-2">
                    <b className="col-span-2">Stack</b>
                    <span className="font-mono">
                        {Array.from(cpu.stack).map((data, n) => (
                            <div key={n}>
                                <Byte key={n} value={data} format={hex} />
                                {cpu.sp === n && <span className="text-green-700"> ← stack pointer</span>}
                            </div>
                        ))}
                    </span>
                </div>
            </div>
        );
    } else {
        return <p className="p-2 text-center">No data :(</p>
    }
};
