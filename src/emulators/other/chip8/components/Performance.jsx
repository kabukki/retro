import React from 'react';
import pretty from 'pretty-ms';
import { useDebug } from '@kabukki/wasm-chip8';

import { Histogram } from '../../../../common';

export const Performance = () => {
    const { performance, emulator } = useDebug();

    return (
        <div className="divide-y">
            <div className="p-2 grid grid-cols-2 gap-x-2 items-center">
                <b className="col-span-2">Elapsed time</b>
                <span>Real</span>
                <span className="font-mono">{performance ? pretty(performance.timestamp, { colonNotation: true, keepDecimalsOnWholeSeconds: true, secondsDecimalDigits: 3 }) : '-'}</span>
                <span>Emulated</span>
                <span className="font-mono">{emulator?.time ? pretty(emulator.time, { colonNotation: true, keepDecimalsOnWholeSeconds: true, secondsDecimalDigits: 3 }) : '-'}</span>
            </div>
            <div className="p-2 grid grid-cols-2 gap-x-2 items-center">
                <b className="col-span-2">Frames</b>
                <span>FPS</span>
                <span className="font-mono">{performance?.fps?.toString() || '-'}</span>
                <span>Delta</span>
                <span className="font-mono">{performance ? pretty(performance?.delta) : '-'}</span>
                <span>Current</span>
                <span className="font-mono">{performance?.frame?.toString() || '-'}</span>
                <div className="h-32 col-span-2">
                    <Histogram history={performance?.history} average={performance?.fpsAverage} />
                </div>
            </div>
            <div className="p-2 text-green-700 text-center font-bold">
                ℹ️ If you experience performance issues, make sure your devtools panel is closed.
            </div>
        </div>
    );
};
