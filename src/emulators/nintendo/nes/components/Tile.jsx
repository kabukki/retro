import React, { memo, useEffect, useRef } from 'react';

export const Tile = memo(({ data, className }) => {
    const ref = useRef();

    useEffect(() => {
        const context = ref.current.getContext('2d');

        if (data) {
            context.putImageData(new ImageData(new Uint8ClampedArray(data), 8, data.length / 32), 0, 0);
        }
    }, [data]);

    return <canvas ref={ref} className={className} style={{ imageRendering: 'pixelated' }} width={8} height={data.length / 32} />
});
