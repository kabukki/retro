import React, { useContext } from 'react';
import Reel from 'react-reel'

import { EmulatorContext } from './context';

export const ModuleStats = () => {
    const { debug } = useContext(EmulatorContext);

    return (
        <aside className="p-4 grid grid-cols-2 gap-x-2 items-center rounded bg-black bg-opacity-25">
            <b>FPS</b>
            <Reel theme={{ reel: 'h-4 flex items-end overflow-y-hidden', number: 'leading-4' }} text={debug?.stats?.fpsAverage.toString() || '-'} />
            <b>Δ</b>
            <Reel theme={{ reel: 'h-4 flex items-end overflow-y-hidden', number: 'leading-4' }} text={debug?.stats ? `${Math.round(debug?.stats?.deltaAverage)}ms` : '-'} />
            <b>#</b>
            <Reel theme={{ reel: 'h-4 flex items-end overflow-y-hidden', number: 'leading-4' }} text={debug?.stats?.frame.toString() || '-'} />
        </aside>
    );
};
