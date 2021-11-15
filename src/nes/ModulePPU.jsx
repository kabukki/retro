import React, { useContext, useEffect, useRef } from 'react';

import { HexViewer, EmulatorContext, Module } from '../common';

export const ModulePPU = () => {
    const canvas1 = useRef(null);
    const canvas2 = useRef(null);
    const canvas3 = useRef(null);
    const { debug } = useContext(EmulatorContext);

    useEffect(() => {
        const context5 = canvas1.current.getContext('2d');

        requestAnimationFrame(() => {
            if (debug?.ppu.patternTables) {
                context5.putImageData(new ImageData(debug?.ppu.patternTables, 16 * 8, 32 * 8), 0, 0);
            } else {
                context5.fillStyle = 'black';
                context5.fillRect(0, 0, 16 * 8, 32 * 8);
            }
        });
    }, [debug?.ppu.patternTables]);

    useEffect(() => {
        const context6 = canvas2.current.getContext('2d');

        requestAnimationFrame(() => {
            if (debug?.ppu.palettes) {
                context6.putImageData(new ImageData(debug?.ppu.palettes, 16 * 8, 2 * 8), 0, 0);
            } else {
                context6.fillStyle = 'black';
                context6.fillRect(0, 0, 16 * 8, 2 * 8);
            }
        });
    }, [debug?.ppu.palettes]);

    useEffect(() => {
        const context7 = canvas3.current.getContext('2d');

        requestAnimationFrame(() => {
            if (debug?.ppu.palette) {
                context7.putImageData(new ImageData(debug?.ppu.palette, 16 * 8, 4 * 8), 0, 0);
            } else {
                context7.fillStyle = 'black';
                context7.fillRect(0, 0, 16 * 8, 4 * 8);
            }
        });
    }, [debug?.ppu.palette]);

    return (
        <Module className="text-center">
            <h2>OAM</h2>
            <HexViewer buffer={debug?.ppu.oam || []} />
            <h2>Pattern tables</h2>
            <canvas
                className="inline rounded"
                style={{ imageRendering: 'pixelated' }}
                ref={canvas1}
                width={16 * 8}
                height={32 * 8}
            />
            <h2>Palettes</h2>
            <canvas
                className="inline rounded"
                style={{ imageRendering: 'pixelated' }}
                ref={canvas2}
                width={16 * 8}
                height={2 * 8}
            />
            <h2>System palette</h2>
            <canvas
                className="inline rounded"
                style={{ imageRendering: 'pixelated' }}
                ref={canvas3}
                width={16 * 8}
                height={4 * 8}
            />
        </Module>
    );
};
