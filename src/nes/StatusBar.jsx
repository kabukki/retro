import React from 'react';

import Warning from '../assets/warning.svg';

export const StatusBar = ({ rom, error, debug }) => {
    return error ? (
        <aside className="flex p-1 gap-1 align-center bg-red-500 text-white font-mono">
            <Warning className="h-5" />
            <b>Crashed</b>
            <span className="flex-1 text-right">{error.message}</span>
        </aside>
    ) : rom ? (
        <aside className="flex p-1 gap-1 align-center bg-green-500 text-white font-mono">
            <span className="animate-bounce">●</span>
            <b>Running</b> {rom.name}
            <span className="flex-1 text-center">
                <b>Frame</b> {debug?.frame}
            </span>
            <span className="flex-1 text-center">
                <b>FPS</b> {debug?.fps}
            </span>
        </aside>
    ) : (
        <aside className="flex p-1 gap-1 align-center bg-gray-500 text-white font-mono">
            <span>●</span>
            <b>Idle</b>
            <span className="flex-1 text-right">...Waiting for ROM...</span>
        </aside>
    );
};
