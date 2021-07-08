import React, { useEffect, useRef } from 'react';

export const Display = ({ framebuffer, width, height, scale = 8 }) => {
    const canvas = useRef(null);

    useEffect(() => {
        if (framebuffer) {
            const context = canvas.current.getContext('2d');

            requestAnimationFrame(() => {
                for (let n = 0; n < 512; n++) {
                    const size = 8 * 8 * 4; // Tile size
                    const data = new ImageData(new Uint8ClampedArray(framebuffer.slice(n * size , (n + 1) * size)), 8, 8);
                    const offset = n >= 256 ? 16 * 8 : 0;
                    context.putImageData(data, offset + (n % 16) * 8, Math.floor(n / 16) % 16 * 8);
                }
            });
        }
    }, [framebuffer]);

    return (
        <canvas
            className="block rounded"
            style={{ imageRendering: 'pixelated' }}
            ref={canvas}
            width={width * scale}
            height={height * scale}
        />
    );
};
