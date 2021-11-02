import { useEffect } from 'react';

export const useKeyboard = (keymap) => {
    const onKey = (e) => {
        if (e.key in keymap) {
            e.preventDefault();
            keymap[e.key]();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);
};
