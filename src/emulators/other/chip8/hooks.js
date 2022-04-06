import { useEffect, useState } from 'react';

export const useInput = ({ keymap, onInput }) => {
    const onKey = (e) => {
        if (e.key in keymap) {
            const key = keymap[e.key];
            switch (e.type) {
                case 'keydown':
                    onInput(key, true);
                    break;
                case 'keyup':
                    onInput(key, false);
                    break;
            }
            e.preventDefault();
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
