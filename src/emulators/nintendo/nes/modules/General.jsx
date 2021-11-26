import React, { useContext } from 'react';
import pretty from 'pretty-ms';
import { prefix } from 'metric-prefix';

import { EmulatorContext } from '../../../../common';

export const General = () => {
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
                <span className="font-mono">{debug?.performance?.frame?.toLocaleString() || '-'}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-2 items-center">
                <b className="col-span-2">Elapsed time</b>
                <span>Real</span>
                <span className="font-mono">{debug?.performance ? pretty(debug.performance.timestamp, { colonNotation: true, keepDecimalsOnWholeSeconds: true, secondsDecimalDigits: 3 }) : '-'}</span>
                <span>Emulated</span>
                <span className="font-mono">{debug?.time ? pretty(debug.time.clock, { colonNotation: true, keepDecimalsOnWholeSeconds: true, secondsDecimalDigits: 3 }) : '-'}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-2 items-center">
                <b className="col-span-2">Clock cycles</b>
                <span>PPU</span>
                <span className="font-mono">{debug?.time ? debug.time.ppuCycles.toLocaleString() : '-'}</span>
                <span>CPU</span>
                <span className="font-mono">{debug?.time ? debug.time.cpuCycles.toLocaleString() : '-'}</span>
                <span>APU</span>
                <span className="font-mono">{debug?.time ? debug.time.apuCycles.toLocaleString() : '-'}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-2 items-center">
                <b className="col-span-2">Clock rate</b>
                <span>PPU</span>
                <span className="font-mono">{debug?.time ? prefix(debug.time.ppuRate, { unit: 'Hz' }) : '-'}</span>
                <span>CPU</span>
                <span className="font-mono">{debug?.time ? prefix(debug.time.cpuRate, { unit: 'Hz' }) : '-'}</span>
                <span>APU</span>
                <span className="font-mono">{debug?.time ? prefix(debug.time.apuRate, { unit: 'Hz' }) : '-'}</span>
            </div>
        </div>
    );
};
