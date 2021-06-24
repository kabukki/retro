import React, { useEffect, useState } from 'react';
import { Emulator, EmulatorAudio, EmulatorDisplay, EmulatorKeypad } from '@kabukki/wasm-chip8';

import { Display } from './Display';

export const Chip8 = ({ wasm, rom, settings }) => {
    const [framebuffer, setFramebuffer] = useState(null);
    const [emulator, setEmulator] = useState(null);
    const [error, setError] = useState();
    
    useEffect(() => {
        if (emulator) {
            emulator.start({
                onDisplay (framebuffer) {
                    setFramebuffer(framebuffer);
                },
                onError (err) {
                    console.error(err);
                    setError(err);
                    stop();
                },
            });

            return () => {
                emulator.stop();
                setEmulator(null);
                setFramebuffer(null);        
            };
        }
    }, [emulator]);

    useEffect(() => {
        if (rom) {
            setEmulator(new Emulator({
                rom,
                wasm,
                audio: new EmulatorAudio('sine'),
                keypad: new EmulatorKeypad(settings.keyboard),
                display: new EmulatorDisplay(setFramebuffer),
                settings,
            }));
        }
    }, [rom]);

    return (
        <div className="relative">
            <Display framebuffer={framebuffer} width={64} height={32} scale={8} settings={settings.display} />
            {error && (
                <div className="absolute inset-0 flex flex-col justify-center bg-gray-500 bg-opacity-50">
                    <div className="py-4">
                        <pre className="py-4 bg-red-500 text-center text-white">{error.message}</pre>
                    </div>
                </div>
            )}
            {emulator && (
                <button className="absolute top-1 right-1" onClick={() => setEmulator(null)}>❌</button>
            )}
        </div>
    );
};
