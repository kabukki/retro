import React, { useRef, useEffect } from 'react';
import { useDebug, useIO } from '@kabukki/wasm-chip8';
import classNames from 'classnames';

export const Video = ({ className }) => {
    const canvas = useRef(null);
    const { frame } = useIO();
    const { performance } = useDebug();

    useEffect(() => {
        if (frame) {
            canvas.current.getContext('2d').putImageData(frame, 0, 0);
        }
    }, [frame]);

    return (
        <div className={classNames('relative', className)}>
            <span className="absolute top-2 right-2 font-mono text-white">{performance?.fps?.toString() || '-'}</span>
            <canvas
                className="h-full w-full bg-black object-contain [image-rendering:pixelated]"
                ref={canvas}
                width={frame?.width}
                height={frame?.height}
            />
        </div>
    );
};
