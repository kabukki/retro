import React, { useEffect, useState } from 'react';
import { Emulator } from '@kabukki/wasm-nes';

import { ROMSelector } from '../ROMSelector';
import { Display } from './Display';
import { Debug } from './Debug';

export const Nes = () => {
    // const [framebuffer, setFramebuffer] = useState(null);
    const [emulator, setEmulator] = useState(new Emulator());
    const [error, setError] = useState(null);
    const [rom, setRom] = useState(null);
    const [debug, setDebug] = useState(null);
    
    useEffect(() => {
        if (rom) {
            emulator.load(rom);
            emulator.start({
                // clockSpeed: 1000 / 1,
                frameRate: 1000 / 10,
                onError (err) {
                    console.error(err);
                    setError(err);
                },
                onCycle: ({ framebuffer, nametables, frame }) => {
                    // setFramebuffer(framebuffer);
                    setDebug((previous) => ({
                        ...previous,
                        nametables,
                        frame,
                    }));
                    console.log('done');
                },
            });
            
            return () => emulator.stop();
        }
    }, [rom]);

    // const onStep = () => {
    //     const { framebuffer, nametables, nametables_ram, patternTables, palettes, palette, frame } = emulator.cycle();
    //     // setFramebuffer(framebuffer);
    //     setDebug({
    //         nametables: nametables.map(x => new Uint8ClampedArray(x)),
    //         nametables_ram,
    //         patternTables,
    //         palettes,
    //         palette,
    //         frame,
    //     });
    //     console.log('Stepped');
    // };

    const onDebug = () => {
        const { nametables_ram, patternTables, palettes, palette } = emulator.debug();
        setDebug((previous) => ({
            ...previous,
            nametables_ram,
            patternTables,
            palettes,
            palette,
        }));
        console.log('Polled');
    };

    return (
        <div>
            <div className="relative">
                <div>
                <button className="p-1 rounded shadow" onClick={() => setRom(null)}>❌ End</button>
                    {/* <button onClick={onStep}>Step</button> */}
                    <button className="p-1 rounded shadow" onClick={onDebug}>Poll debug information</button>
                </div>
                {/* <Display framebuffer={framebuffer} width={32 * 8} height={30 * 8} scale={1} /> */}
                <div className="flex">
                    <Debug {...debug} onPoll={onDebug} />
                </div>
                {!rom && (
                    <div className="absolute inset-0 flex flex-col justify-center bg-gray-500 bg-opacity-50">
                        <div className="py-4 bg-gray-500 text-center text-white" >
                            <ROMSelector onSelect={setRom} />
                        </div>
                    </div>
                )}
                {error && (
                    <div className="absolute inset-0 flex flex-col justify-center bg-gray-500 bg-opacity-50">
                        <div className="py-4">
                            <pre className="py-4 bg-red-500 text-center text-white">{error.message}</pre>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
