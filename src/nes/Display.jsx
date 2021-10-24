import React, { forwardRef } from 'react';

export const Display = forwardRef(({ width, height, scale, crt, refFullscreen }, ref) => (
    <div className="fullscreen relative grid place-content-center bg-black" ref={refFullscreen}>
        <canvas
            ref={ref}
            className="max-w-full"
            width={width}
            height={height}
            style={{ imageRendering: 'pixelated', width: `${width * scale}px` }}
        />
        {crt && <div className="absolute inset-0 crt" />}
    </div>
));
