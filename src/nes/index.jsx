import React, { useEffect, useState } from 'react';
import { Cartridge, Emulator } from '@kabukki/wasm-nes';
import { Helmet } from 'react-helmet';

import { ROMSelector } from '../ROMSelector';
import { Display } from './Display';

export const Nes = () => {
    const [framebuffer, setFramebuffer] = useState(null);
    const [emulator, setEmulator] = useState(new Emulator());
    const [error, setError] = useState(null);
    const [rom, setRom] = useState(null);
    
    useEffect(() => {
        if (rom) {
            emulator.load(rom);
            emulator.start({
                clockSpeed: (1000 / 3) / 2,
                onError (err) {
                    setError(err);
                },
            });
            
            return () => emulator.stop();
        }
    }, [rom]);

    return (
        <div>
            <Helmet>
                <title>NES</title>
            </Helmet>
            <div className="relative flex gap-4">
                <Display framebuffer={framebuffer} width={32 * 8} height={16 * 8} scale={1} />
                <div>
                    <button onClick={() => setEmulator(null)}>❌ End</button>
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
