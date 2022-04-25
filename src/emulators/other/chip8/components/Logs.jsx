import React from 'react';
import { useDebug } from '@kabukki/wasm-chip8';

import { hex } from '../../../../utils';
import { Byte } from '../../../../common';

export const Logs = () => {
    const { emulator } = useDebug();

    if (emulator) {
        return (
            <div className="p-2 divide-y">
                <div className="p-2 text-green-700 text-center font-bold">
                    ℹ️ Showing limited history.
                </div>
                <table className="w-full table-auto text-left">
                    <thead className="border-b">
                        <tr>
                            <th>PC</th>
                            <th>Opcode</th>
                            <th>Disassembly</th>
                            {Array.from({ length: 16 }, (_, n) => n).map((n) => <th key={n}>V{n.toString(16).toUpperCase()}</th>)}
                            <th>I</th>
                            <th>SP</th>
                            <th>DT</th>
                            <th>ST</th>
                            <th>Cycles</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {emulator.cpu.logs.map((log) => (
                            <tr key={log.cycles} className="font-mono">
                                <td>{hex(log.pc, { padding: 3 })}</td>
                                <td className="text-gray-500">{log.disassembly.opcode}</td>
                                <td>{log.disassembly.string}</td>
                                {log.v.map((v, n) => (
                                    <td key={n}>
                                        <Byte value={v} format={hex.with({ padding: 2 })} />
                                    </td>
                                ))}
                                <td><Byte value={log.i} format={hex.with({ padding: 3 })} /></td>
                                <td><Byte value={log.sp} /></td>
                                <td><Byte value={log.dt} /></td>
                                <td><Byte value={log.st} /></td>
                                <td>{log.cycles}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    } else {
        return <p className="p-2 text-center">No data :(</p>
    }
};
