import React, { useContext } from 'react';
import { Nes } from '@kabukki/wasm-nes';
import classNames from 'classnames';

import { EmulatorContext } from '../context';

export const Video = ({ className }) => {
    const { canvas, emulator } = useContext(EmulatorContext);

    return (
        <div className={classNames('relative', className)}>
            <span className="absolute top-2 right-2 font-mono text-white">{emulator.performance?.fps?.toString() || '-'}</span>
            <canvas
                className="h-full w-full bg-black object-contain [image-rendering:pixelated]"
                ref={canvas}
                width={Nes.VIDEO_WIDTH}
                height={Nes.VIDEO_HEIGHT}
            />
        </div>
    );
};
