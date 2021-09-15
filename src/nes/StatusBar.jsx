import React from 'react';

import Warning from '../assets/warning.svg';

export const StatusBar = ({ rom, error, stats }) => {
    const icon = error ? <Warning className="h-5" /> : rom ? <span className="animate-bounce">●</span> : <span>●</span>;
    const status = error ? 'Crashed' : rom ? 'Running' : 'Idle';
    const color = error ? 'red' : rom ? 'green' : 'gray';

    return (
        <aside className="grid items-center grid-cols-1 divide-y sm:grid-cols-4 sm:divide-x sm:divide-y-0 rounded shadow font-mono">
            <span className={`font-bold text-${color}-500 text-center`}>
                {icon}&nbsp;<b>{status}</b>
            </span>
            {rom ? (
                <>
                    <span className="text-center">
                        <b>#</b>&nbsp;{stats?.frame || '-'}
                    </span>
                    <span className="text-center">
                        <b>Δ</b>&nbsp;{stats ? `${Math.round(stats?.deltaAverage)}ms` : '-'}
                    </span>
                    <span className="text-center">
                        <b>FPS</b>&nbsp;{stats?.fpsAverage || '-'}
                    </span>
                </>
            ) : (
                <span className="col-span-3 text-center">...Waiting for ROM...</span>
            )}
        </aside>
    );
};
