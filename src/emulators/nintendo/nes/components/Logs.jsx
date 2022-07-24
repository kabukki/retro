import React, { useState, useContext } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBug, faInfoCircle, faExclamationTriangle, faXmarkCircle, faDownload } from '@fortawesome/free-solid-svg-icons';

import { EmulatorContext } from '../context';

const levelMap = {
    TRACE: { fg: 'text-neutral-400', icon: faMagnifyingGlass },
    DEBUG: { fg: 'text-neutral-600', icon: faBug },
    INFO: { fg: 'text-black', icon: faInfoCircle },
    WARNING: { fg: 'text-yellow-500', bg: 'bg-yellow-50', icon: faExclamationTriangle },
    ERROR: { fg: 'text-red-500', bg: 'bg-red-50', icon: faXmarkCircle },
};

export const Logs = () => {
    const { emulator } = useContext(EmulatorContext);
    const [limit, setLimit] = useState(20);
    const [level, setLevel] = useState('TRACE');

    const filtered = emulator.logs.history.filter((log) => Object.keys(levelMap).indexOf(log.level) >= Object.keys(levelMap).indexOf(level));

    const onDownlad = () => {
        const blob = new Blob(emulator.logs.history.map(({ text }) => text + '\n'), { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'nes.log';
        link.click();
    };

    const onToggle = (e) => {
        if (e.target.checked) {
            emulator.logs.enable();
        } else {
            emulator.logs.disable();
        }
    };

    return (
        <div className="divide-y">
            <div className="flex divide-x">
                <div className="p-2">
                    <button className="p-1 flex gap-1 items-center rounded shadow bg-green-700 text-white" onClick={onDownlad}>
                        <FontAwesomeIcon className="w-4" icon={faDownload} />
                        Download logs
                    </button>
                </div>
                <label className="p-2 flex gap-1 items-center">
                    Display latest
                    <input className="w-20" type="number" value={limit} onChange={e => setLimit(e.target.valueAsNumber)} />
                    out of {filtered.length}
                </label>
                <label className="p-2 flex gap-1 items-center">
                    Filter log levels
                    <select value={level} onChange={(e) => setLevel(e.target.value)}>
                        {Object.keys(levelMap).map((level) => <option key={level} value={level}>{`⩾ ${level}`}</option>)}
                    </select>
                </label>
                <label className="p-2 flex gap-1 items-center">
                    Collect logs
                    <input type="checkbox" value={emulator.logs.enabled} onChange={onToggle} />
                </label>
            </div>
            <div className="flex flex-col-reverse divide-y divide-y-reverse">
                {filtered.length > limit && <p className="p-2 text-center">... {filtered.length - limit} more ...</p>}
                {filtered.slice(-limit).map((log, n) => (
                    <div className={classNames('p-2 flex gap-2 items-center font-mono', levelMap[log.level].fg, levelMap[log.level].bg)} key={n}>
                        <FontAwesomeIcon className="w-4" icon={levelMap[log.level].icon} title={log.level} />
                        <span className="flex-1 whitespace-pre-wrap break-all border-r">{log.text}</span>
                        <span className="gap-2">{log.location}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
