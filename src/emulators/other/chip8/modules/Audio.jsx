import React, { useContext } from 'react';

import { EmulatorContext } from '../../../../common';

export const Audio = () => {
    const { emulator } = useContext(EmulatorContext);

    const onVolume = (e) => {
        emulator.audio.volume = e.target.valueAsNumber;
    };

    const onFrequency = (e) => {
        emulator.audio.frequency = e.target.valueAsNumber;
    };

    const onType = (e) => {
        emulator.audio.type = e.target.value;
    };

    return (
        <div className="grid grid-cols-2 gap-x-2 items-center">
            <b>Sample rate</b>
            {emulator?.audio?.sampleRate.toLocaleString()} Hz
            <b>Volume</b>
            <input type="range" min={0} max={1} step={0.01} defaultValue={1} onChange={onVolume} />
            <b>Frequency</b>
            <input type="range" min={20} max={20000} step={1} defaultValue={440} onChange={onFrequency} />
            <b>Type</b>
            <select className="bg-transparent outline-none" defaultValue={emulator.audio.baseType} onChange={onType}>
                <option value="sawtooth">Sawtooth</option>
                <option value="sine">Sine</option>
                <option value="square">Square</option>
                <option value="triangle">Triangle</option>
            </select>
        </div>
    );
};
