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
        <>
            <main className="container mx-auto p-4 flex flex-col gap-4">
                <div className="mx-auto rounded shadow overflow-hidden divide-y">
                    <Display ref={canvas} width={32 * 8} height={30 * 8} scale={scale} off={!rom || !!error} />
                    <StatusBar rom={rom} error={error} stats={debug?.stats} />
                </div>
                <div>
                    {error ? (
                        <pre>{error.message}</pre>
                    ) : rom ? (
                        <>
                            <button className="p-1 rounded shadow" onClick={stop}>Pause</button>
                            <button className="p-1 rounded shadow" onClick={start}>Resume</button>
                            <button className="p-1 rounded shadow" onClick={() => setRom(null)}>❌ End</button>
                            <label>
                                Scale: x{scale}
                                <input type="range" min="1" max="4" value={scale} onChange={e => setScale(Number(e.target.value))} />
                            </label>
                            {/* <hr />
                            <Debug {...debug} /> */}
                        </>
                    ) : (
                        <ROMSelector onSelect={setRom} />
                    )}
                </div>
            </main>
        </>
    );
};
