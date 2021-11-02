import { useEffect, useState } from 'react';
import { Emulator } from '@kabukki/wasm-chip8';

import { hex } from '../utils';
import { EmulatorAudio } from './audio';

const audio = new EmulatorAudio('sine');

export const useEmulator = (settings, canvas) => {
    const [emulator, setEmulator] = useState(null);
    const [error, setError] = useState(null);
    const [debug, setDebug] = useState(() => ({}));

    const start = () => {
        emulator?.start({
            cpuFrequency: settings.core.cpuFrequency,
            timerFrequency: settings.core.timerFrequency,
            colors: {
                on: settings.ui.colorOn,
                off: settings.ui.colorOff,
            },
            onError (err) {
                console.error(err);
                setError(err);
            },
            onCPU: (opcode) => {
                setDebug((previous) => ({
                    ...previous,
                    lastInstruction: hex(opcode),
                }));
            },
            onTimer: (shouldBeep) => {
                if (settings.audio) {
                    if (shouldBeep) {
                        audio.play();
                    } else {
                        audio.pause();
                    }
                }
            },
            onDebug: (info) => {
                setDebug((previous) => ({
                    ...previous,
                    ...info,
                }));
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

    const load = async (rom) => {
        try {
            setEmulator(new Emulator(canvas.current, rom));
        } catch (err) {
            setError(err);
        }
    };

    const input = (key, state) => {
        emulator?.input(key, state);
    };

    useEffect(() => {
        if (emulator) {
            try {
                start();
                return stop;
            } catch (err) {
                console.error(err);
                setError(err);
            }
        }
    }, [emulator]);
    
    return {
        emulator, debug, error,
        start, pause, stop, load, input,
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
    const [modules, setModules] = useState(['meta', 'stats', 'input']);
    const [core, setCore] = useState({
        clockSpeed: 1000 / 200,
        timerFrequency: 1000 / 60,
    });
    const [ui, setUI] = useState({
        colorOn: '#ffffff',
        colorOff: '#000000',
        crt: true,
        audio: true,
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
        core,
        ui,
        input,
        setModules,
        setCore,
        setUI,
        setInput,
    };
};
