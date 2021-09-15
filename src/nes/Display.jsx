import React, { forwardRef } from 'react';

export const Display = forwardRef(({ width, height, scale, off }, ref) => (
    <canvas
        ref={ref}
        className={off ? 'filter grayscale' : null}
        style={{ imageRendering: 'pixelated', width: `${width * scale}px`, maxWidth: '100%' }}
        width={width}
        height={height}
    />
));
