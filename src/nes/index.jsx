import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { InputType } from '@kabukki/wasm-nes';

import { ROMSelector } from '../ROMSelector';
import { Display } from './Display';
import { StatusBar } from './StatusBar';
import { Controller } from './Controller';
import { useEmulator, useInput } from './hooks';
import Keyboard from '../assets/keyboard.svg';
import Gamepad from '../assets/gamepad.svg';

const typeMap = {
    [InputType.Keyboard]: <Keyboard />,
    [InputType.Gamepad]: <Gamepad />,
};

const formatOptionLabelWithIcon = ({ label, type }) => (
    <div className="flex items-center gap-2">
        <div className="w-4 h-4 text-center">{typeMap[type]}</div>
        <div className="flex-1 truncate">{label}</div>
    </div>
);

const selectStyles = {
    control: () => ({
        display: 'flex',
    }),
    menu: (provided) => ({
        ...provided,
        margin: 0,
    }),
    menuList: (provided) => ({
        ...provided,
        padding: 0,
    }),
    option: (provided, { isSelected, isFocused, ...a }) => ({
        ...provided,
        backgroundColor: isSelected ? '#047857' : isFocused ? '#D1FAE5' : 'initial',
        '&:active': {
            backgroundColor: '#047857',
            color: '#fff',
        },
    }),
};

export const Nes = () => {
    const canvas = useRef(null);
    const [rom, setRom] = useState(null);
    const [scale, setScale] = useState(2);
    const { start, stop, load, input, debug, error } = useEmulator(canvas);
    const inputs = useInput();
    const [player1Input, setPlayer1Input] = useState(null);
    const [player2Input, setPlayer2Input] = useState(null);
    
    useEffect(() => input(0, player1Input?.value), [player1Input?.value]);
    useEffect(() => input(1, player2Input?.value), [player2Input?.value]);

    useEffect(() => {
        if (rom) {
            load(rom.buffer);
            start();
            return stop;
        }
    }, [rom]);

    return (
        <main className="container mx-auto p-4 grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 border rounded shadow overflow-hidden divide-y">
                <div className="text-center text-green-700 font-mono font-bold">
                    {rom ? rom.name : '...Waiting for ROM...'}
                </div>
                <div className="relative flex justify-center bg-black">
                    {(error || !rom) && (
                        <div className="absolute z-10 inset-0 grid place-content-center backdrop-filter backdrop-blur backdrop-brightness-50">
                            {error && <pre className="text-white">{error.message}</pre>}
                            {!rom && <ROMSelector onSelect={setRom} />}
                        </div>
                    )}
                    <Display ref={canvas} width={32 * 8} height={30 * 8} scale={scale} />
                </div>
                <StatusBar rom={rom} error={error} stats={debug?.stats} />
            </div>
            <div className="border rounded shadow divide-y">
                <div className="text-center font-bold font-mono">Player 1</div>
                <Controller input={player1Input?.value} disabled={!player1Input} />
                <Select
                    styles={selectStyles}
                    value={player1Input}
                    options={inputs}
                    placeholder="Select input source..."
                    onChange={setPlayer1Input}
                    getOptionLabel={(input) => input.label}
                    getOptionValue={(input) => input.id}
                    isOptionDisabled={(input) => player2Input?.id === input.id}
                    formatOptionLabel={formatOptionLabelWithIcon}
                    isSearchable={false}
                    isClearable
                />
            </div>
            <div className="border rounded shadow divide-y">
                <div className="text-center font-bold font-mono">Player 2</div>
                <Controller input={player2Input?.value} disabled={!player2Input} />
                <Select
                    styles={selectStyles}
                    value={player2Input}
                    options={inputs}
                    placeholder="Select input source..."
                    onChange={setPlayer2Input}
                    getOptionLabel={(input) => input.label}
                    getOptionValue={(input) => input.id}
                    isOptionDisabled={(input) => player1Input?.id === input.id}
                    formatOptionLabel={formatOptionLabelWithIcon}
                    isSearchable={false}
                    isClearable
                />
            </div>
            {rom && (
                <div className="p-4 sm:col-span-2 border rounded shadow">
                    <button className="p-1 rounded shadow" onClick={stop}>Pause</button>
                    <button className="p-1 rounded shadow" onClick={start}>Resume</button>
                    <button className="p-1 rounded shadow" onClick={() => setRom(null)}>❌ End</button>
                    <label>
                        Scale: x{scale}
                        <input type="range" min="1" max="4" value={scale} onChange={e => setScale(Number(e.target.value))} />
                    </label>
                    {/* <hr />
                    <Debug {...debug} /> */}
                </div>
            )}
        </main>
    );
};
