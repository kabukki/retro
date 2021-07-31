import React, { useEffect, useRef } from 'react';

export const Display = ({ framebuffer, width, height, scale = 8 }) => {
    const canvas = useRef(null);

    useEffect(() => {
        const context = canvas.current.getContext('2d');

        requestAnimationFrame(() => {
            if (framebuffer) {
                context.putImageData(new ImageData(framebuffer, 32 * 8, 30 * 8), 0, 0);
            } else {
                context.fillStyle = 'black';
                context.fillRect(0, 0, width, height);
            }
        });
    }, [framebuffer]);

    return (
        <div>
            <h1>Framebuffer</h1>
            <canvas
                className="block rounded"
                style={{ imageRendering: 'pixelated' }}
                ref={canvas}
                width={width}
                height={height}
            />
        </div>
    );
};
