import React, { forwardRef } from 'react';

export const Display = forwardRef(({ width, height, crt }, ref) => (
    <div className="h-full relative bg-black flex-1">
        <canvas
            className="absolute inset-0 h-full w-full object-contain"
            style={{ imageRendering: 'pixelated' }}
            ref={ref}
            width={width}
            height={height}
        />
        {crt && <div className="absolute inset-0 crt" />}
    </div>
));
