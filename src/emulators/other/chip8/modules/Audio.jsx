import React from 'react';
import { useIO } from '@kabukki/wasm-chip8';

export const Audio = () => {
    const { audio } = useIO();

    const onVolume = (e) => audio.volume(e.target.valueAsNumber);
    const onFrequency = (e) => audio.frequency(e.target.valueAsNumber);
    const onType = (e) => audio.type(e.target.value);

    return (
        <div className="grid grid-cols-2 gap-x-2 items-center">
            <span>Sample rate</span>
            {audio?.sampleRate.toLocaleString()} Hz
            <span>Volume</span>
            <input type="range" min={0} max={1} step={0.01} defaultValue={1} onChange={onVolume} />
            <span>Frequency</span>
            <input type="range" min={20} max={20000} step={1} defaultValue={440} onChange={onFrequency} />
            <span>Type</span>
            <select className="bg-transparent outline-none" defaultValue={audio?.baseType} onChange={onType}>
                <option value="sawtooth">Sawtooth</option>
                <option value="sine">Sine</option>
                <option value="square">Square</option>
                <option value="triangle">Triangle</option>
            </select>
        </div>
    );
};
