import { useCallback, useEffect } from 'react';

export const useInput = (mapping) => {
    const onKey = useCallback((e) => {
        for (const [key, type, callback] of mapping) {
            if (key === e.key && type === e.type) {
                callback();
                e.preventDefault();
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
