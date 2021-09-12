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
    const canvas = useRef(null);
    
    useEffect(() => {
        if (rom) {
            emulator.load(rom.buffer);
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
            
            return () => emulator.stop();
        }
    }, [rom]);

    return (
        <>
            <main className="h-full flex">
                <nav className="flex flex-col shadow">
                    <ul className="flex-1 p-4">
                        <li>Main</li>
                        <li>Debug</li>
                        <li>Memory</li>
                    </ul>
                </nav>
                <section className="flex-1">
                    <div className="flex justify-center relative border-b p-4">
                        {(!rom || error) && <div className="absolute inset-0 bg-gray-500 bg-opacity-50" />}
                        <Display ref={canvas} width={32 * 8} height={30 * 8} />
                    </div>
                    <div className="p-4">
                        {error ? (
                            <pre>{error.message}</pre>
                        ) : rom ? (
                            <button className="p-1 rounded shadow" onClick={() => setRom(null)}>❌ End</button>
                        ) : (
                            <ROMSelector onSelect={setRom} />
                        )}
                    </div>
                </section>
            </main>
            <StatusBar rom={rom} error={error} debug={debug} />
        </>
    );
};
