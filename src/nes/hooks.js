import { useEffect, useState } from 'react';
import { Emulator, InputMonitor, Store } from '@kabukki/wasm-nes';

const db = new Store();

export const useEmulator = (canvas) => {
    const [emulator, setEmulator] = useState(null);
    const [error, setError] = useState(null);
    const [debug, setDebug] = useState(null);
    const [snapshots, setSnapshots] = useState(() => []);

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

    const loadRom = async (rom) => {
        try {
            setEmulator(new Emulator(canvas.current, rom));
        } catch (err) {
            setError(err);
        }
    };

    const loadSnapshot = async (snapshot) => {
        const vm = emulator || new Emulator(canvas.current, snapshot.rom);
        vm.restore(snapshot);
        setEmulator(vm);
    };

    const input = (index, value) => {
        emulator?.input(index, value);
    };

    const snapshot = () => {
        const snapshot = emulator.snapshot();
        db.save(snapshot.rom.fingerprint, snapshot);
    };

    useEffect(() => {
        if (emulator) {
            start();
            return stop;
        }
    }, [emulator]);

    useEffect(() => {
        db.getAll().then(setSnapshots).catch(setError);
    }, []);

    return [
        { emulator, snapshots, debug, error },
        { start, pause, stop, reset, loadRom, loadSnapshot, input, snapshot },
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
