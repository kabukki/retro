import React, { createContext, useRef, useState, useReducer, useEffect } from 'react';
import { Nes } from '@kabukki/wasm-nes';

export const EmulatorContext = createContext(null);

export const EmulatorProvider = ({ children }) => {
    const canvas = useRef(null);
    const [emulator, setEmulator] = useState(null);
    const [, forceRender] = useReducer((x) => x + 1, 0);

    // Link canvas to emulator
    useEffect(() => {
        if (emulator) {
            emulator.canvas = canvas.current;
        }
    }, [canvas.current, emulator]);

    useEffect(() => {
        if (emulator) {
            // Workaround to sync with emulator state. Maybe try useSyncExternalStore instead ?
            emulator.onCycle = forceRender;
            emulator.onStatus = forceRender;
            // Auto-start emulator on load
            emulator.start();
            return emulator.stop.bind(emulator);
        }
    }, [emulator]);

    return (
        <EmulatorContext.Provider value={{
            canvas,
            emulator,
            create (rom) {
                Nes.new(rom).then(setEmulator).catch(console.error);
            },
            destroy () {
                setEmulator(null);
            },
        }}>
            {children}
        </EmulatorContext.Provider>
    );
};
