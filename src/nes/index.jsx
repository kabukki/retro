import React, { useEffect, useRef, useState } from 'react';
import { Emulator } from '@kabukki/wasm-nes';

import { ROMSelector } from '../ROMSelector';
import { Display } from './Display';
import { StatusBar } from './StatusBar';

export const Nes = () => {
    const [emulator] = useState(new Emulator());
    const [error, setError] = useState(null);
    const [rom, setRom] = useState(null);
    const [debug, setDebug] = useState(null);
    const [scale, setScale] = useState(2);
    const canvas = useRef(null);
    
    const start = () => {
        emulator.start({
            canvas: canvas.current,
            onError (err) {
                console.error(err);
                setError(err);
            },
            onDebug (info) {
                setDebug((previous) => ({
                    ...previous,
                    ...info,
                }));
            },
        });
    };

    const stop = () => {
        emulator.stop();
    };

    useEffect(() => {
        if (rom) {
            emulator.load(rom.buffer);
            start();
            return stop;
        }
    }, [rom]);

    return (
        <main className="container mx-auto p-4 flex flex-col gap-4">
            <div className="mx-auto border rounded shadow overflow-hidden divide-y">
                <div className="text-center text-green-700 font-mono font-bold">
                    {rom ? rom.name : '...Waiting for ROM...'}
                </div>
                <div className="relative">
                    {(error || !rom) && (
                        <div className="absolute z-10 inset-0 grid place-content-center backdrop-filter backdrop-blur backdrop-brightness-50">
                            {error && <pre className="text-white">{error.message}</pre>}
                            {!rom && <ROMSelector onSelect={setRom} />}
                        </div>
                    )}
                    <Display ref={canvas} width={32 * 8} height={30 * 8} scale={scale} />
                </div>
                <StatusBar rom={rom} error={error} stats={debug?.stats} />
            </div>
            {rom && (
                <div>
                    <button className="p-1 rounded shadow" onClick={stop}>Pause</button>
                    <button className="p-1 rounded shadow" onClick={start}>Resume</button>
                    <button className="p-1 rounded shadow" onClick={() => setRom(null)}>❌ End</button>
                    <label>
                        Scale: x{scale}
                        <input type="range" min="1" max="4" value={scale} onChange={e => setScale(Number(e.target.value))} />
                    </label>
                    {/* <hr />
                    <Debug {...debug} /> */}
                </div>
            )}
        </main>
    );
};
