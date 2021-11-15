import React, { useContext } from 'react';

import { EmulatorContext, Module, BarChart } from '../common';

export const ModuleAudio = () => {
    const { debug } = useContext(EmulatorContext);

    return (
        <Module className="grid grid-cols-2 gap-x-2 items-center">
            <b>Sample rate</b>
            {debug?.audio?.sampleRate.toLocaleString()} Hz
            <BarChart
                className="col-span-2"
                title="Ring buffer"
                max={debug?.audio?.capacity}
                chunks={[
                    { value: debug?.audio?.readable, color: 'green-700', label: 'Readable' },
                    { value: debug?.audio?.writable, color: 'green-500', label: 'Writable' },
                ]}
            />
        </Module>
    );
};
