import React, { useContext } from 'react';
import Reel from 'react-reel'
import pretty from 'pretty-ms';

import { EmulatorContext, Module } from '../common';

export const ModulePerformance = () => {
    const { debug } = useContext(EmulatorContext);

    return (
        <Module className="space-y-2">
            <div className="grid grid-cols-2 gap-x-2 items-center">
                <b className="col-span-2">Frames</b>
                <span>FPS</span>
                {/* <Reel theme={{ reel: 'h-4 flex items-end overflow-y-hidden', number: 'leading-4' }} text={debug?.performance?.fps?.toString() || '-'} /> */}
                <span className="font-mono">{debug?.performance?.fps?.toString() || '-'}</span>
                <span>Delta</span>
                {/* <Reel theme={{ reel: 'h-4 flex items-end overflow-y-hidden', number: 'leading-4' }} text={debug?.performance ? pretty(debug?.performance?.delta) : '-'} /> */}
                <span className="font-mono">{debug?.performance ? pretty(debug?.performance?.delta) : '-'}</span>
                <span>#</span>
                {/* <Reel theme={{ reel: 'h-4 flex items-end overflow-y-hidden', number: 'leading-4' }} text= /> */}
                <span className="font-mono">{debug?.performance?.frame?.toString() || '-'}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-2 items-center">
                <b className="col-span-2">Elapsed time</b>
                <span>Real</span>
                <span className="font-mono">{debug?.performance ? pretty(debug.performance.timestamp) : '-'}</span>
                <span>Emulated</span>
                <span className="font-mono">{debug?.time ? pretty(debug.time.clock) : '-'}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-2 items-center">
                <b className="col-span-2">Cycles</b>
                <span>PPU</span>
                <span className="font-mono">{debug?.time ? debug.time.ppuCycles.toLocaleString() : '-'}</span>
                <span>CPU</span>
                <span className="font-mono">{debug?.time ? debug.time.cpuCycles.toLocaleString() : '-'}</span>
                <span>APU</span>
                <span className="font-mono">{debug?.time ? debug.time.apuCycles.toLocaleString() : '-'}</span>
            </div>
        </Module>
    );
};
