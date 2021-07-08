import React, { useEffect, useRef } from 'react';

export const Display = ({ framebuffer, width, height, scale = 8, settings }) => {
    const canvas = useRef(null);

    useEffect(() => {
        const context = canvas.current.getContext('2d');

        requestAnimationFrame(() => {
            if (framebuffer) {
                for (let y = 0; y < height; y++) {
                    for (let x = 0; x < width; x++) {
                        context.fillStyle = framebuffer[x + y * width] === 1 ? settings.colorOn : settings.colorOff;
                        context.fillRect(x * scale, y * scale, scale, scale);
                    }
                }
            } else {
                context.fillStyle = settings.colorOff;
                context.fillRect(0, 0, width * scale, height * scale);
            }
        });
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
