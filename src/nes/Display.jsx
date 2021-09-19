import React, { forwardRef } from 'react';

export const Display = forwardRef(({ width, height, scale }, ref) => (
    <canvas
        ref={ref}
        className="max-w-full"
        style={{ imageRendering: 'pixelated', width: `${width * scale}px` }}
        width={width}
        height={height}
    />
));
