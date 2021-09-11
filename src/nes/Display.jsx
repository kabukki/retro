import React, { useState, forwardRef } from 'react';

export const Display = forwardRef(({ width, height }, ref) => {
    const [scale, setScale] = useState(2);

    return (
        <div>
            <canvas
                className="block rounded shadow"
                style={{ imageRendering: 'pixelated', width: `${width * scale}px`, height: `${height * scale}px` }}
                ref={ref}
                width={width}
                height={height}
            />
            <label>
                Scale: x{scale}
                <input type="range" min="1" max="4" value={scale} onChange={e => setScale(Number(e.target.value))} />
            </label>
        </div>
    );
});
