import { useCallback, useEffect } from 'react';

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

// To be merged
export const useInput = (mapping) => {
    const onKey = useCallback((e) => {
        for (const [key, type, callback] of mapping) {
            if (key === e.key && type === e.type) {
                callback();
            }
        }
    }, [mapping]);

    useEffect(() => {
        document.addEventListener('keydown', onKey);
        document.addEventListener('keyup', onKey);

        return () => {
            document.removeEventListener('keydown', onKey);
            document.removeEventListener('keyup', onKey);
        };
    }, [onKey]);
};
