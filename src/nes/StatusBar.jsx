import React from 'react';
import Reel from 'react-reel'

import Warning from '../assets/warning.svg';

export const StatusBar = ({ rom, error, stats }) => {
    const cells = [
        {
            color: `${error ? 'red' : rom ? 'green' : 'gray'}-500`,
            icon: error ? <Warning className="h-5" /> : rom ? <span className="animate-bounce">●</span> : <span>●</span>,
            text: error ? 'Crashed' : rom ? 'Running' : 'Idle',
        }, {
            color: 'current',
            icon: <b>#</b>,
            text: <Reel theme={{ reel: 'h-4 flex items-end overflow-y-hidden', number: 'leading-4' }} text={stats?.frame.toString() || '-'} />,
        }, {
            color: 'current',
            icon: <b>Δ</b>,
            text: <Reel theme={{ reel: 'h-4 flex items-end overflow-y-hidden', number: 'leading-4' }} text={stats ? `${Math.round(stats?.deltaAverage)}ms` : '-'} />,

        }, {
            color: 'current',
            icon: <b>FPS</b>,
            text: <Reel theme={{ reel: 'h-4 flex items-end overflow-y-hidden', number: 'leading-4' }} text={stats?.fpsAverage.toString() || '-'} />,
        },
    ];

    return (
        <aside className="grid items-center grid-cols-1 divide-y sm:grid-cols-4 sm:divide-x sm:divide-y-0 font-mono">
            {cells.map((cell, index) => (
                <div key={index} className={`flex gap-2 justify-center items-center text-${cell.color} text-center`}>
                    {cell.icon}
                    {cell.text}
                </div>
            ))}
        </aside>
    );
};
