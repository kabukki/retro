import React, { forwardRef } from 'react';

export const Display = forwardRef(({ width, height, crt }, ref) => (
    <div className="h-full relative bg-black">
        <canvas
            className="absolute inset-0 h-full w-full object-contain"
            ref={ref}
            width={width}
            height={height}
            style={{ imageRendering: 'pixelated' }}
        />
        {crt && <div className="absolute inset-0 crt" />}
    </div>
));
