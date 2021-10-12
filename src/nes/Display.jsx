import React, { forwardRef } from 'react';

export const Display = forwardRef(({ width, height, scale, crt }, ref) => (
    <div className="relative">
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
