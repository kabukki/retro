import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { InputType } from '@kabukki/wasm-nes';

import Keyboard from '../assets/keyboard.svg';
import Gamepad from '../assets/gamepad.svg';
import { ROMSelector } from '../ROMSelector';
import { HexViewer } from '../HexViewer';
import { Display } from './Display';
import { Debug } from './Debug';
import { StatusBar } from './StatusBar';
import { Controller } from './Controller';
import { Save } from './Save';
import { useEmulator, useInput } from './hooks';

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
    const [scale, setScale] = useState(2);
    const [
        { emulator, saves, debug, error },
        { start, pause, stop, reset, load, input },
    ] = useEmulator(canvas);
    const inputs = useInput();
    const [player1Input, setPlayer1Input] = useState(null);
    const [player2Input, setPlayer2Input] = useState(null);
    
    useEffect(() => input(0, player1Input?.value), [player1Input?.value]);
    useEffect(() => input(1, player2Input?.value), [player2Input?.value]);

    useEffect(() => {
        if (player1Input === null) {
            setPlayer1Input(inputs.find((input) => input.type === InputType.Keyboard));
        }
    }, []);

    return (
        <main className="container mx-auto p-4 grid sm:grid-cols-2 gap-4 font-mono">
            <div className="sm:col-span-2 border rounded shadow overflow-hidden divide-y">
                <div className="text-center text-green-700 font-bold">
                    {emulator ? emulator.rom.name : '...Waiting for ROM...'}
                </div>
                <div className="relative flex justify-center bg-black">
                    {(error || !emulator) && (
                        <div className="absolute z-10 inset-0 grid place-content-center backdrop-filter backdrop-blur backdrop-brightness-50 text-center text-white">
                            {error && error.message}
                            {!emulator && <ROMSelector onSelect={load} />}
                        </div>
                    )}
                    <Display ref={canvas} width={32 * 8} height={30 * 8} scale={scale} />
                </div>
                <StatusBar rom={emulator?.rom} error={error} stats={debug?.stats} />
            </div>
            <div className="flex flex-col border rounded shadow divide-y">
                <div className="text-center font-bold">Player 1</div>
                {player1Input ? <Controller input={player1Input?.value} /> : <div className="p-4 flex-1 flex flex-col justify-center items-center text-red-500">Disconnected</div>}
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
            <div className="flex flex-col border rounded shadow divide-y">
                <div className="text-center font-bold">Player 2</div>
                {player2Input ? <Controller input={player2Input?.value} /> : <div className="p-4 flex-1 flex flex-col justify-center items-center text-red-500">Disconnected</div>}
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
            {/* <div className="border rounded shadow">
                <HexViewer buffer={Uint8Array.from({ length: 0x34 }, () => Math.round(Math.random() * 255))} />
            </div> */}
            {emulator && (
                <>
                    <div className="p-4 border rounded shadow">
                        <button className="p-1 rounded shadow" onClick={reset}>Reset</button>
                        <button className="p-1 rounded shadow" onClick={pause}>Pause</button>
                        <button className="p-1 rounded shadow" onClick={stop}>Stop</button>
                        <button className="p-1 rounded shadow" onClick={start}>Resume</button>
                        <label>
                            Scale: x{scale}
                            <input type="range" min="1" max="4" value={scale} onChange={e => setScale(Number(e.target.value))} />
                        </label>
                        <hr />
                        <Debug {...debug} />
                    </div>
                    <div className="border rounded shadow divide-y">
                        <div className="text-center font-bold">RAM</div>
                        <HexViewer buffer={debug?.ram || []} />
                    </div>
                </>
            )}
            <div className="sm:col-span-2 border rounded shadow divide-y">
                <div className="text-center font-bold">Saved games</div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {saves.length > 0 ? saves.map((save, index) => (
                        <Save key={index} {...save} />
                    )) : <p>No saves yet!</p>}
                </div>
            </div>
        </main>
    );
};
