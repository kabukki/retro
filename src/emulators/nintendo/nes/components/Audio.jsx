import React, { useContext } from 'react';
import pretty from 'pretty-ms';
import { prefix } from 'metric-prefix';

import { EmulatorContext, BarChart } from '../../../../common';

export const Audio = () => {
    const { debug, emulator } = useContext(EmulatorContext);

    const onVolume = (e) => {
        emulator.audio.volume = e.target.valueAsNumber;
    };

    return (
        <div className="space-y-2">
            <div className="grid grid-cols-2 gap-x-2 items-center">
                <span>Sample rate</span>
                {emulator?.audio ? prefix(emulator?.audio?.sampleRate, { unit: 'Hz' }) : '-'}
                <span>Volume</span>
                <input type="range" min={0} max={1} step={0.01} defaultValue={emulator?.audio.volume} onChange={onVolume} />
            </div>
            <div className="grid grid-cols-2 gap-x-2 items-center">
                <b className="col-span-2">Buffer</b>
                <span>Length</span>
                <span className="font-mono">{emulator?.audio ? pretty(emulator.audio.length) : '-'}</span>
                <span>Capacity</span>
                <span className="font-mono">{emulator?.audio.capacity} frames</span>
                <BarChart
                    className="col-span-2"
                    max={emulator?.audio.capacity}
                    chunks={[
                        { value: debug?.audio?.readable, color: 'green-700', label: 'Readable' },
                        { value: debug?.audio?.writable, color: 'green-500', label: 'Writable' },
                    ]}
                />
            </div>
        </div>
    );
};
