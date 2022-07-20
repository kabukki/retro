import React from 'react';
import { useLifecycle, Status } from '@kabukki/wasm-chip8';
import colors from 'tailwindcss/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faPause, faPlay, faRotate, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

import { Indicator } from '../../../../common';

const statusMap = {
    [Status.NONE]: { text: '-', color: colors.black },
    [Status.IDLE]: { text: 'Idle', color: colors.neutral[400] },
    [Status.RUNNING]: { text: 'Running', color: colors.green[700] },
    [Status.ERROR]: { text: 'Error', color: colors.red[700] },
};

const Button = ({ icon, children, ...props }) => (
    <button className="flex gap-1 items-center" {...props}>
        {children}
        <FontAwesomeIcon icon={icon} className="w-4" />
    </button>
);

export const StatusBar = ({ advanced, onAdvanced }) => {
    const { cycleCpu, cycleTimer, start, stop, destroy, status, error } = useLifecycle();
    const { text, color } = statusMap[status];

    return (
        <div className={classNames('p-2 grid items-center bg-white divide-x', advanced && !error ? 'grid-cols-4' : 'grid-cols-3')}>
            <div className="flex gap-2 justify-center items-center">
                <Indicator color={color} />
                {text}
            </div>
            <div className="flex gap-2 justify-center">
                <Button onClick={destroy} icon={faPowerOff} title="Stop" />
                {!error && (
                    <>
                        <Button icon={faRotate} title="Reset" />
                        {status === Status.RUNNING ? (
                            <Button onClick={stop} icon={faPause} title="Pause" />
                        ) : (
                            <Button onClick={start} icon={faPlay} title="Resume" />
                        )}
                    </>
                )}
            </div>
            {advanced && !error && (
                <div className="flex gap-2 justify-center">
                    <Button onClick={cycleCpu} icon={faForward}>Step CPU</Button>
                    <Button onClick={cycleTimer} icon={faForward}>Step timers</Button>
                </div>
            )}
            <label className="flex gap-2 justify-center items-center">
                Advanced mode
                <input type="checkbox" checked={advanced} onChange={e => onAdvanced(e.target.checked)} />
            </label>
        </div>
    );
};
