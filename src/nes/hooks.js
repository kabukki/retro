import { useEffect, useReducer, useState } from 'react';
import { Emulator } from '@kabukki/wasm-nes';

import { Keyboard, Gamepad, Store } from '../common';

const db = new Store();

export const useEmulator = (canvas) => {
    const [emulator, setEmulator] = useState(null);
    const [error, setError] = useState(null);
    const [debug, setDebug] = useState(() => ({}));
    const [saves, setSaves] = useState(() => []);

    const start = () => {
        emulator?.start({
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
        emulator?.stop();
    };

    const stop = () => {
        pause();
        setEmulator(null);
    };

    const reset = () => {
        emulator?.reset();
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

    return {
        emulator, saves, debug, error,
        start, pause, stop, reset, load, input,
    };
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

export const useInput = (nPlayers, { onInput = console.log }) => {
    const inputs = useInputs();
    const [players, setPlayers] = useState(() => new Array(nPlayers).fill(null));

    const setPlayer = (player, input) => {
        setPlayers((previous) => {
            const players = previous.slice();
            players[player] = input;
            return players;
        });
    };

    // It's ok to call hooks in a loop as long as the order is respected across renders
    for (let n = 0; n < nPlayers; n++) {
        useEffect(() => onInput(n, players[n]?.value), [players[n]?.value]);
    }

    useEffect(() => {
        setPlayer(0, inputs.find((input) => input.type === 'keyboard'));
    }, []);

    return {
        inputs,
        players,
        setPlayer,
    };
};

export const useSettings = () => {
    const [modules, setModules] = useState(['meta', 'stats', 'input']);
    const [crt, setCRT] = useState(false);

    return {
        modules,
        crt,
        setModules,
        setCRT,
    };
};
