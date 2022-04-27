import React, { useState } from 'react';
import { useDebug } from '@kabukki/wasm-chip8';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBug, faInfo, faExclamation, faXmark, faDownload } from '@fortawesome/free-solid-svg-icons';

const levelMap = {
    trace: { fg: 'text-gray-400', icon: faMagnifyingGlass },
    debug: { fg: 'text-gray-600', icon: faBug },
    info: { fg: 'text-black', icon: faInfo },
    warning: { fg: 'text-yellow-500', icon: faExclamation },
    error: { fg: 'text-red-500', icon: faXmark },
};

export const Logs = () => {
    const { logs } = useDebug();
    const [limit, setLimit] = useState(20);

    const onDownlad = () => {
        const blob = new Blob(logs.map(({ text }) => text + '\n'), { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'chip8.log';
        link.click();
    };

    if (logs) {
        return (
            <div className="divide-y">
                <div className="p-2 flex justify-between">
                    <label className="flex gap-1 items-center">
                        Display latest
                        <input className="w-20" type="number" value={limit} onChange={e => setLimit(e.target.valueAsNumber)} />
                        out of {logs.length}
                    </label>
                    <button className="p-1 flex gap-1 items-center rounded shadow bg-green-700 text-white" onClick={onDownlad}>
                        <FontAwesomeIcon className="w-4" icon={faDownload} />
                        Download logs
                    </button>
                </div>
                <div className="flex flex-col-reverse divide-y">
                    {logs.length > limit && <p className="p-2 text-center">... {logs.length - limit} more ...</p>}
                    {logs.slice(-limit).map((log, n) => (
                        <div className={classNames('p-2 flex gap-2 items-center font-mono', levelMap[log.level].fg)} key={n}>
                            <FontAwesomeIcon className="w-4" icon={levelMap[log.level].icon} title={log.level} />
                            <span className="flex-1 whitespace-pre-wrap break-all border-r">{log.text}</span>
                            <span className="gap-2">{log.location}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else {
        return <p className="p-2 text-center">No data :(</p>;
    }
};
