import React from 'react';

import Warning from '../assets/warning.svg';

export const StatusBar = ({ rom, error, debug }) => {
    return error ? (
        <aside className="flex p-1 gap-1 align-center bg-red-500 text-white">
            <Warning className="h-5" />
            <b>Crashed</b>
            <pre className="flex-1 text-right">{error.message}</pre>
        </aside>
    ) : rom ? (
        <aside className="flex p-1 gap-1 align-center bg-green-500 text-white">
            <span className="animate-bounce">●</span>
            <b>Running</b> {rom.name}
            <pre className="flex-1 text-center">
                <b>FRAME</b> {debug?.frame}
            </pre>
            <pre className="flex-1 text-center">
                <b>FPS</b> {debug?.fps}
            </pre>
        </aside>
    ) : (
        <aside className="flex p-1 gap-1 align-center bg-gray-500 text-white">
            <span>●</span>
            <b>Idle</b>
            <pre className="flex-1 text-right">...Waiting for ROM...</pre>
        </aside>
    );
};
