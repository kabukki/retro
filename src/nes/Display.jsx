import React, { forwardRef } from 'react';

export const Display = forwardRef(({ width, height, scale }, ref) => (
    <canvas
        ref={ref}
        style={{ imageRendering: 'pixelated', width: `${width * scale}px`, maxWidth: '100%' }}
        width={width}
        height={height}
    />
));
