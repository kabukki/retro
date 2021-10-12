import { useEffect, useState } from 'react';
import { Emulator, InputMonitor, Store } from '@kabukki/wasm-nes';

const db = new Store();

export const useEmulator = (canvas) => {
    const [emulator, setEmulator] = useState(null);
    const [error, setError] = useState(null);
    const [debug, setDebug] = useState(null);
    const [saves, setSaves] = useState(() => []);

    const start = () => {
        emulator.start({
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
            onSave (save) {
                db.save(emulator.rom.fingerprint, save);
            },
        });
    };

    const pause = () => {
        emulator.stop();
    };

    const stop = () => {
        pause();
        setEmulator(null);
    };

    const reset = () => {
        emulator.reset();
    };

    const load = async (rom) => {
        try {
            const emulator = new Emulator(canvas.current, rom);
            const save = await db.get(rom.fingerprint);

            if (save) {
                console.log(`Found save ${save.name}`);
                emulator.loadSave(save);
            }

            setEmulator(emulator);
        } catch (err) {
            setError(err);
        }
    };

    const input = (index, value) => {
        emulator?.input(index, value);
    };

    useEffect(() => {
        if (emulator) {
            start();
            return stop;
        }
    }, [emulator]);

    useEffect(() => {
        db.getAll().then(setSaves).catch(setError);
    }, []);

    return [
        { emulator, saves, debug, error },
        { start, pause, stop, reset, load, input },
    ];
};

export const useInput = () => {
    const [inputs, setInputs] = useState(() => []);

    useEffect(() => {
        const monitor = new InputMonitor();
        
        setInputs(monitor.inputs);
        monitor.addEventListener('update', (e) => setInputs(e.detail));
        monitor.start();
    }, []);

    return inputs;
};
