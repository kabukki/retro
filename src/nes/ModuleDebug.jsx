import React, { useContext, useEffect, useRef } from 'react';

import { EmulatorContext } from '../common';

export const ModuleDebug = () => {
    const { debug } = useContext(EmulatorContext);
    const canvas5 = useRef(null);
    const canvas6 = useRef(null);
    const canvas7 = useRef(null);

    useEffect(() => {
        const context5 = canvas5.current.getContext('2d');

        requestAnimationFrame(() => {
            if (debug?.patternTables) {
                context5.putImageData(new ImageData(debug?.patternTables, 16 * 8, 32 * 8), 0, 0);
            } else {
                context5.fillStyle = 'black';
                context5.fillRect(0, 0, 16 * 8, 32 * 8);
            }
        });
    }, [debug?.patternTables]);

    useEffect(() => {
        const context6 = canvas6.current.getContext('2d');

        requestAnimationFrame(() => {
            if (debug?.palettes) {
                context6.putImageData(new ImageData(debug?.palettes, 16 * 8, 2 * 8), 0, 0);
            } else {
                context6.fillStyle = 'black';
                context6.fillRect(0, 0, 16 * 8, 2 * 8);
            }
        });
    }, [debug?.palettes]);

    useEffect(() => {
        const context7 = canvas7.current.getContext('2d');

        requestAnimationFrame(() => {
            if (debug?.palette) {
                context7.putImageData(new ImageData(debug?.palette, 16 * 8, 4 * 8), 0, 0);
            } else {
                context7.fillStyle = 'black';
                context7.fillRect(0, 0, 16 * 8, 4 * 8);
            }
        });
    }, [debug?.palette]);

    return (
        <aside className="p-4 rounded bg-black bg-opacity-25 text-center">
            <h2>Pattern tables</h2>
            <canvas
                className="block rounded"
                style={{ imageRendering: 'pixelated' }}
                ref={canvas5}
                width={16 * 8}
                height={32 * 8}
            />
            <h2>Palettes</h2>
            <canvas
                className="block rounded shadow"
                style={{ imageRendering: 'pixelated' }}
                ref={canvas6}
                width={16 * 8}
                height={2 * 8}
            />
            <h2>System palette</h2>
            <canvas
                className="block rounded"
                style={{ imageRendering: 'pixelated' }}
                ref={canvas7}
                width={16 * 8}
                height={4 * 8}
            />
        </aside>
    );
};
