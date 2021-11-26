import { useEffect, useState } from 'react';
import { Chip8 } from '@kabukki/wasm-chip8';


export const useEmulator = (settings, canvas) => {
    const [emulator, setEmulator] = useState(null);
    const [error, setError] = useState(null);
    const [debug, setDebug] = useState(() => ({}));

    const onDebug = ({ detail: info }) => {
        setDebug((previous) => ({
            ...previous,
            ...info,
        }));
    };

    const onError = ({ detail: error }) => {
        console.error(error);
        setError(error);
    };

    useEffect(() => {
        if (emulator) {
            emulator.addEventListener('debug', onDebug);
            emulator.addEventListener('error', onError);
            emulator.start();

            return () => {
                emulator.removeEventListener('debug', onDebug);
                emulator.removeEventListener('error', onError);
                emulator.stop();
            };
        }
    }, [emulator]);
    
    return {
        emulator,
        debug,
        error,
        stop () {
            setEmulator(null);
        },
        async load (rom) {
            try {
                const emulator = new Chip8({
                    canvas: canvas.current,
                    rom,
                    colors: {
                        on: settings.ui.colorOn,
                        off: settings.ui.colorOff,
                    },
                });
    
                await emulator.init();

                setEmulator(emulator);
            } catch (err) {
                console.error(err);
                setError(err);
            }
        },
    };
};

export const useInput = (keymap, { onInput = console.log }) => {
    const [input, setInput] = useState(() => new Array(16).fill(false));

    const onKey = (e) => {
        if (e.key in keymap) {
            const key = keymap[e.key];
            e.preventDefault();
            switch (e.type) {
                case 'keydown':
                    onInput(key, true);
                    setInput((previous) => previous.map((pressed, index) => index === key ? true : pressed));
                    break;
                case 'keyup':
                    onInput(key, false);
                    setInput((previous) => previous.map((pressed, index) => index === key ? false : pressed));
                    break;
            }
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', onKey);
        document.addEventListener('keyup', onKey);

        return () => {
            document.removeEventListener('keydown', onKey);
            document.removeEventListener('keyup', onKey);
        };
    }, [onKey]);

    return input;
};

export const useSettings = () => {
    const [modules, setModules] = useState(['performance', 'input']);
    const [ui, setUI] = useState({
        colorOn: '#ffffff',
        colorOff: '#000000',
        crt: true,
    });
    const [input, setInput] = useState({
        map: {
            '1': 0x1, '2': 0x2, '3': 0x3, '4': 0xC,
            'q': 0x4, 'w': 0x5, 'e': 0x6, 'r': 0xD,
            'a': 0x7, 's': 0x8, 'd': 0x9, 'f': 0xE,
            'z': 0xA, 'x': 0x0, 'c': 0xB, 'v': 0xF,
        },
    });

    return {
        modules,
        ui,
        input,
        setModules,
        setUI,
        setInput,
    };
};
