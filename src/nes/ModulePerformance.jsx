import React, { useContext } from 'react';
import Reel from 'react-reel'
import pretty from 'pretty-ms';

import { EmulatorContext, Module } from '../common';

export const ModulePerformance = () => {
    const { debug } = useContext(EmulatorContext);

    return (
        <Module className="grid grid-cols-2 gap-x-2 items-center">
            <b>FPS</b>
            <Reel theme={{ reel: 'h-4 flex items-end overflow-y-hidden', number: 'leading-4' }} text={debug?.performance?.fps?.toString() || '-'} />
            <b>Δ</b>
            <Reel theme={{ reel: 'h-4 flex items-end overflow-y-hidden', number: 'leading-4' }} text={debug?.performance ? pretty(debug?.performance?.delta) : '-'} />
            <b>#</b>
            <Reel theme={{ reel: 'h-4 flex items-end overflow-y-hidden', number: 'leading-4' }} text={debug?.performance?.frame?.toString() || '-'} />
            <b>Real time</b>
            {debug?.performance ? pretty(debug.performance.timestamp) : '-'}
            <b>PPU cycles</b>
            {debug?.time ? debug.time.ppuCycles.toLocaleString() : '-'}
            <b>CPU cycles</b>
            {debug?.time ? debug.time.cpuCycles.toLocaleString() : '-'}
            <b>APU cycles</b>
            {debug?.time ? debug.time.apuCycles.toLocaleString() : '-'}
            <b>Emulator time</b>
            {debug?.time ? pretty(debug.time.clock) : '-'}
        </Module>
    );
};
