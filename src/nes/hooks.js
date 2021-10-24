import { useEffect, useReducer, useState } from 'react';
import { Emulator, Store } from '@kabukki/wasm-nes';

import { Keyboard, Gamepad } from './input';

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

export const useInputs = () => {
    const [, forceUpdate] = useReducer(x => !x, true);
    const [inputs, setInputs] = useState(() => [new Keyboard()]);
    
    const watch = (input) => {
        input.addEventListener('update', forceUpdate);
        input.monitor();
    };
    const unwatch = (input) => {
        input.removeEventListener('update', forceUpdate);
        input.stop();            
    };

    useEffect(() => {
        watch(inputs[0]);
        window.addEventListener('gamepadconnected', ({ gamepad }) => {
            setInputs((previous) => {
                const input = new Gamepad({ id: gamepad.id });
                watch(input);
                return previous.concat(input);
            });
        });
        window.addEventListener('gamepaddisconnected', ({ gamepad }) => {
            setInputs((previous) => {
                const input = previous.find(({ id }) => id === gamepad.id);

                if (input) {
                    unwatch(input);
                    return previous.filter(({ id }) => id !== input.id);
                } else {
                    return previous;
                }
            });
        });
    }, []);

    return inputs;
};
