import { useEffect, useState } from 'react';
import { Emulator, InputMonitor } from '@kabukki/wasm-nes';

export const useEmulator = (canvas) => {
    const [emulator] = useState(() => new Emulator());
    const [error, setError] = useState(null);
    const [debug, setDebug] = useState(null);

    return {
        start () {
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
        },
        stop () {
            emulator.stop();
        },
        load (rom) {
            emulator.load(rom);
        },
        input (player, value) {
            emulator.input(player, value);
        },
        debug,
        error,
    };
};

export const useInput = () => {
    const [inputs, setInputs] = useState(() => []);

    useEffect(() => {
        const monitor = new InputMonitor();
        
        monitor.addEventListener('update', (e) => setInputs(e.detail));
        setInputs(monitor.inputs);
        monitor.start();
    }, []);

    return inputs;
};
