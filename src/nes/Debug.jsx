import React, { useEffect, useRef } from 'react';

export const Debug = ({ nametables = null, nametables_ram = [], patternTables = null, palettes = null, palette = null, frame = 0 }) => {
    const canvas1 = useRef(null);
    const canvas5 = useRef(null);
    const canvas6 = useRef(null);
    const canvas7 = useRef(null);

    useEffect(() => {
        const context1 = canvas1.current.getContext('2d');

        requestAnimationFrame(async () => {
            const width = 32 * 8;
            const height = 30 * 8;

            if (nametables) {
                context1.putImageData(new ImageData(nametables[0], width, height), 0, 0);
                // context1.putImageData(new ImageData(nametables[1], width, height), width, 0);
                // context1.putImageData(new ImageData(nametables[2], width, height), 0, height);
                // context1.putImageData(new ImageData(nametables[3], width, height), width, height);
            } else {
                context1.fillStyle = 'black';
                context1.fillRect(0, 0, 2 * width, 2 * height);
            }
        });
    }, [nametables]);

    useEffect(() => {
        const context5 = canvas5.current.getContext('2d');

        requestAnimationFrame(() => {
            if (patternTables) {
                context5.putImageData(new ImageData(patternTables, 16 * 8, 32 * 8), 0, 0);
            } else {
                context5.fillStyle = 'black';
                context5.fillRect(0, 0, 16 * 8, 32 * 8);
            }
        });
    }, [patternTables]);

    useEffect(() => {
        const context6 = canvas6.current.getContext('2d');

        requestAnimationFrame(() => {
            if (palettes) {
                context6.putImageData(new ImageData(palettes, 16 * 8, 2 * 8), 0, 0);
            } else {
                context6.fillStyle = 'black';
                context6.fillRect(0, 0, 16 * 8, 2 * 8);
            }
        });
    }, [palettes]);

    useEffect(() => {
        const context7 = canvas7.current.getContext('2d');

        requestAnimationFrame(() => {
            if (palette) {
                context7.putImageData(new ImageData(palette, 16 * 8, 4 * 8), 0, 0);
            } else {
                context7.fillStyle = 'black';
                context7.fillRect(0, 0, 16 * 8, 4 * 8);
            }
        });
    }, [palette]);

    return (
        <div className="flex gap-4">
            <div>
                <b>FRAME</b> {frame}
            </div>
            <div>
                <h1>Nametables</h1>
                <canvas
                    className="block rounded"
                    style={{ imageRendering: 'pixelated' }}
                    ref={canvas1}
                    width={2 * 32 * 8}
                    height={2 * 30 * 8}
                />
                {/* <HexEditor data={nametables_ram} columns={32} showRowLabels showColumnLabels /> */}
            </div>
            <div>
                <h1>Pattern tables</h1>
                <canvas
                    className="block rounded"
                    style={{ imageRendering: 'pixelated' }}
                    ref={canvas5}
                    width={16 * 8}
                    height={32 * 8}
                />
                <h1>Palettes</h1>
                <canvas
                    className="block rounded shadow"
                    style={{ imageRendering: 'pixelated' }}
                    ref={canvas6}
                    width={16 * 8}
                    height={2 * 8}
                />
                <h1>System palette</h1>
                <canvas
                    className="block rounded"
                    style={{ imageRendering: 'pixelated' }}
                    ref={canvas7}
                    width={16 * 8}
                    height={4 * 8}
                />
            </div>
        </div>
    );
};
