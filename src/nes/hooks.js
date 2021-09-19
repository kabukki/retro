import { useEffect, useState } from 'react';
import { Emulator, Keyboard, Gamepad } from '@kabukki/wasm-nes';

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

export const useInput = (modes) => {
    const [input, setInput] = useState(0);
    const [gamepad, setGamepad] = useState(false);

    useEffect(() => {
        const cleanup = [];

        if (modes.keyboard === true) {
            const keyboard = new Keyboard({ onUpdate: setInput });
            cleanup.push(keyboard.clear.bind(keyboard));
        }

        if (typeof modes.gamepad === 'number') {
            const gamepad = new Gamepad({ index: modes.gamepad, onUpdate: setInput, onGamepad: setGamepad });
            cleanup.push(gamepad.clear.bind(gamepad));
        }

        return () => cleanup.forEach((clear) => clear());
    }, []);

    return [input, gamepad];
}