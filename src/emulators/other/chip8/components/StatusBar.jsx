import React, { useContext, useState } from 'react';
import { Status } from '@kabukki/wasm-chip8';
import colors from 'tailwindcss/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faPause, faPlay, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

import { Indicator } from '../../../../common';
import { EmulatorContext } from '../context';

const statusMap = {
    [Status.IDLE]: { text: 'Idle', color: colors.neutral[400] },
    [Status.RUNNING]: { text: 'Running', color: colors.green[700] },
    [Status.ERROR]: { text: 'Error', color: colors.red[700] },
};

const stepMap = {
    tick: 'clock cycle',
    cpu: 'CPU cycle',
    timer: 'timer cycle',
};

export const StatusBar = ({ advanced, onAdvanced }) => {
    const { emulator, destroy } = useContext(EmulatorContext);
    const [stepBy, setStepBy] = useState('timer');

    return (
        <div className={classNames('grid bg-white divide-x', advanced && !emulator.error ? 'grid-cols-4' : 'grid-cols-3')}>
            <div className="p-2 flex gap-2 justify-center items-center">
                <Indicator color={statusMap[emulator.status].color} />
                {statusMap[emulator.status].text}
            </div>
            <div className="p-2 flex gap-2 justify-center items-center">
                <button title="Stop" onClick={destroy}><FontAwesomeIcon icon={faPowerOff} /></button>
                {!emulator.error && (
                    emulator.status === Status.RUNNING ? (
                        <button title="Pause" onClick={emulator.stop.bind(emulator)}><FontAwesomeIcon icon={faPause} /></button>
                    ) : (
                        <button title="Resume" onClick={emulator.start.bind(emulator)}><FontAwesomeIcon icon={faPlay} /></button>
                    )
                )}
            </div>
            {advanced && !emulator.error && (
                <div className="p-2 flex gap-2 justify-center items-center">
                    Step by one
                    <select className="border rounded" value={stepBy} onChange={(e) => setStepBy(e.target.value)}>
                        {Object.entries(stepMap).map(([step, name]) => <option key={step} value={step}>{name}</option>)}
                    </select>
                    <button className="text-green-700" title="Step" onClick={() => emulator.cycleUntil(stepBy)}>
                        <FontAwesomeIcon  className="w-4 fill-green-700" icon={faForward} />
                    </button>
                </div>
            )}
            <label className="p-2 flex gap-2 justify-center items-center">
                Advanced mode
                <input type="checkbox" checked={advanced} onChange={e => onAdvanced(e.target.checked)} />
            </label>
        </div>
    );
};
