import React, { useContext } from 'react';
import pretty from 'pretty-ms';

import { EmulatorContext, Module, BarChart } from '../common';

export const ModuleAudio = () => {
    const { debug, emulator } = useContext(EmulatorContext);

    const onVolume = (e) => {
        emulator.audio.volume = e.target.valueAsNumber;
    };

    return (
        <Module className="grid grid-cols-2 gap-x-2 items-center">
            <b>Sample rate</b>
            {emulator?.audio?.sampleRate.toLocaleString()} Hz
            <b>Volume</b>
            <input type="range" min={0} max={1} step={0.01} defaultValue={1} onChange={onVolume} />
            <b>Buffer length</b>
            {pretty(emulator.audio.length)}
            <b>Buffer capacity</b>
            {emulator.audio.capacity} frames
            <BarChart
                className="col-span-2"
                max={emulator?.audio.capacity}
                chunks={[
                    { value: debug?.audio?.readable, color: 'green-700', label: 'Readable' },
                    { value: debug?.audio?.writable, color: 'green-500', label: 'Writable' },
                ]}
            />
        </Module>
    );
};
