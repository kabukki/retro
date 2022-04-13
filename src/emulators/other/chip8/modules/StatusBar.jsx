import React from 'react';
import { useLifecycle, Status } from '@kabukki/wasm-chip8';
import colors from 'tailwindcss/colors';

const statusMap = {
    [Status.NONE]: { text: '-', color: colors.black },
    [Status.IDLE]: { text: 'Idle', color: colors.gray[500] },
    [Status.RUNNING]: { text: 'Running', color: colors.green[700] },
    [Status.ERROR]: { text: 'Error', color: colors.red[700] },
};

export const StatusBar = ({ advanced, onAdvanced }) => {
    const { start, stop, destroy, status, error } = useLifecycle();
    const { text, color } = statusMap[status];

    return (
        <div className="p-2 grid grid-cols-3 items-center bg-white">
            <div className="flex gap-2 items-center">
                <div className="h-4 w-4 rounded-full" style={{ backgroundColor: color }} />
                {text}
            </div>
            <div className="flex gap-2 justify-center">
                {status === Status.RUNNING ? <button onClick={stop}>⏸</button> : <button onClick={start}>▶️</button>}
                <button>⏩</button>
                <button onClick={destroy}>⏹</button>
                <button>🔄</button>
            </div>
            <div className="text-right">
                <label>
                    Advanced mode
                    <input type="checkbox" checked={advanced} onChange={e => onAdvanced(e.target.checked)} />
                </label>
            </div>
        </div>
    );
};
