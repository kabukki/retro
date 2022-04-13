import React, { useRef, useEffect } from 'react';
import { useIO } from '@kabukki/wasm-chip8';

export const Video = () => {
    const canvas = useRef(null);
    const { frame } = useIO();

    useEffect(() => {
        if (frame) {
            canvas.current.getContext('2d').putImageData(frame, 0, 0);
        }
    }, [frame]);

    return (
        <canvas
            className="h-full w-full bg-black object-contain"
            style={{ imageRendering: 'pixelated' }}
            ref={canvas}
            width={frame?.width}
            height={frame?.height}
        />
    );
};
