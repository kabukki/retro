import React, { useContext, useEffect, useRef } from 'react';

import { HexViewer, EmulatorContext } from '../../../../common';

import Icon from '../../../../assets/paint.svg';

export const Graphics = () => {
    const canvas1 = useRef(null);
    const canvas2 = useRef(null);
    const canvas3 = useRef(null);
    const { debug, settings } = useContext(EmulatorContext);

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
        <div className="space-y-2">
            <div>
                <b>OAM</b>
                <HexViewer buffer={debug?.ppu.oam || []} />
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="row-span-2">
                    <b>Pattern tables</b>
                    <canvas
                        className="w-full rounded"
                        style={{ imageRendering: 'pixelated' }}
                        ref={canvas1}
                        width={16 * 8}
                        height={32 * 8}
                    />
                </div>
                <div>
                    <b>Palettes</b>
                    <canvas
                        className="w-full rounded"
                        style={{ imageRendering: 'pixelated' }}
                        ref={canvas2}
                        width={16 * 8}
                        height={2 * 8}
                    />
                </div>
                <div>
                    <b>System palette</b>
                    <canvas
                        className="w-full rounded"
                        style={{ imageRendering: 'pixelated' }}
                        ref={canvas3}
                        width={16 * 8}
                        height={4 * 8}
                    />
                </div>
            </div>
            <div>
                <label>
                    CRT filter
                    <input type="checkbox" checked={settings.crt} onChange={e => settings.setCRT(e.target.checked)} />
                </label>
            </div>
        </div>
    );
};

Graphics.Icon = Icon;
