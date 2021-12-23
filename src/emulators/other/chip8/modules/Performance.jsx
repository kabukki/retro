import React, { useContext } from 'react';
import pretty from 'pretty-ms';

import { EmulatorContext } from '../../../../common';
import { hex } from '../../../../utils';

export const Performance = () => {
    const { debug } = useContext(EmulatorContext);

    return (
        <div className="space-y-2">
            <div className="grid grid-cols-2 gap-x-2 items-center">
                <b className="col-span-2">Frames</b>
                <span>FPS</span>
                <span className="font-mono">{debug?.performance?.fps?.toString() || '-'}</span>
                <span>Delta</span>
                <span className="font-mono">{debug?.performance ? pretty(debug?.performance?.delta) : '-'}</span>
                <span>Current</span>
                <span className="font-mono">{debug?.performance?.frame?.toString() || '-'}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-2 items-center">
                <b className="col-span-2">Elapsed time</b>
                <span>Real</span>
                <span className="font-mono">{debug?.performance ? pretty(debug.performance.timestamp, { colonNotation: true, keepDecimalsOnWholeSeconds: true, secondsDecimalDigits: 3 }) : '-'}</span>
            </div>
            <h2 className="font-bold">Last insruction</h2>
            <pre>{debug.lastInstruction ? hex(debug.lastInstruction.opcode) : '-'}</pre>
        </div>
    );
};
