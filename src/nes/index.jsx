import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select';

import Keyboard from '../assets/keyboard.svg';
import Gamepad from '../assets/gamepad.svg';
import { ROMSelector, HexViewer } from '../common';
import { Display } from './Display';
import { Debug } from './Debug';
import { StatusBar } from './StatusBar';
import { Controller } from './Controller';
import { Save } from './Save';
import { useEmulator, useInputs } from './hooks';

const typeMap = {
    keyboard: <Keyboard />,
    gamepad: <Gamepad />,
};

const formatOptionLabelWithIcon = ({ id, type }) => (
    <div className="flex items-center gap-2">
        <div className="w-4 h-4 text-center">{typeMap[type]}</div>
        <div className="flex-1 truncate">{id}</div>
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
    option: (provided, { isSelected, isFocused }) => ({
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
    const refFullscreen = useRef(null);
    const [scale, setScale] = useState(2);
    const [crt, setCrt] = useState(true);
    const [
        { emulator, saves, debug, error },
        { start, pause, stop, reset, load, input },
    ] = useEmulator(canvas);

    // Player input
    const inputs = useInputs();
    const [player1, setPlayer1] = useState(null);
    const [player2, setPlayer2] = useState(null);

    useEffect(() => input(0, player1?.value), [player1?.value]);
    useEffect(() => input(1, player2?.value), [player2?.value]);

    useEffect(() => {
        setPlayer1(inputs.find((input) => input.type === 'keyboard'));
    }, []);

    const onPress = (input) => (button) => {
        input.press(button);
        input.commit();
    };

    const onRelease = (input) => (button) => {
        input.release(button);
        input.commit();
    };

    const onFullscreen = () => {
        refFullscreen.current.requestFullscreen();
    };

    return (
        <main className="container mx-auto p-4 grid sm:grid-cols-2 gap-4 font-mono">
            <div className="sm:col-span-2 border rounded shadow overflow-hidden divide-y">
                <div className="text-center text-green-700 font-bold">
                    {emulator ? emulator.rom.name : '...Waiting for ROM...'}
                </div>
                <div className="relative">
                    {(error || !emulator) && (
                        <div className="absolute z-10 inset-0 grid place-content-center backdrop-filter backdrop-blur backdrop-brightness-50 text-center text-white">
                            {error && error.message}
                            {!emulator && <ROMSelector onSelect={load} />}
                        </div>
                    )}
                    <Display ref={canvas} refFullscreen={refFullscreen} width={32 * 8} height={30 * 8} scale={scale} crt={crt} />
                </div>
                <StatusBar rom={emulator?.rom} error={error} stats={debug?.stats} />
            </div>
            <div className="flex flex-col border rounded shadow divide-y">
                <div className="text-center font-bold">Player 1</div>
                {player1 ? (
                    <Controller
                        input={player1?.value}
                        onPress={onPress(player1)}
                        onRelease={onRelease(player1)}
                    />
                ) : (
                    <div className="p-4 flex-1 flex flex-col justify-center items-center text-red-500">
                        Disconnected
                    </div>
                )}
                <Select
                    styles={selectStyles}
                    value={player1}
                    options={inputs}
                    placeholder="Select input source..."
                    onChange={setPlayer1}
                    getOptionLabel={(input) => input.id}
                    getOptionValue={(input) => input.id}
                    isOptionDisabled={(input) => player2?.id === input.id}
                    formatOptionLabel={formatOptionLabelWithIcon}
                    isSearchable={false}
                    isClearable
                />
            </div>
            <div className="flex flex-col border rounded shadow divide-y">
                <div className="text-center font-bold">Player 2</div>
                {player2 ? (
                    <Controller
                        input={player2?.value}
                        onPress={onPress(player2)}
                        onRelease={onRelease(player2)}
                    />
                ) : (
                    <div className="p-4 flex-1 flex flex-col justify-center items-center text-red-500">
                        Disconnected
                    </div>
                )}
                <Select
                    styles={selectStyles}
                    value={player2}
                    options={inputs}
                    placeholder="Select input source..."
                    onChange={setPlayer2}
                    getOptionLabel={(input) => input.id}
                    getOptionValue={(input) => input.id}
                    isOptionDisabled={(input) => player1?.id === input.id}
                    formatOptionLabel={formatOptionLabelWithIcon}
                    isSearchable={false}
                    isClearable
                />
            </div>
            {emulator && (
                <>
                    <div className="border rounded shadow divide-y sm:col-span-2">
                        <div className="p-4 flex flex-wrap justify-center gap-4">
                            <button className="p-1 rounded shadow" onClick={reset}>Reset</button>
                            <button className="p-1 rounded shadow" onClick={pause}>Pause</button>
                            <button className="p-1 rounded shadow" onClick={stop}>Stop</button>
                            <button className="p-1 rounded shadow" onClick={start}>Resume</button>
                        </div>
                        <div className="p-4 flex flex-wrap justify-center gap-4">
                            <label>
                                Scale: x{scale}
                                <input type="range" min="1" max="4" value={scale} onChange={e => setScale(Number(e.target.value))} />
                            </label>
                            <label>
                                CRT filter
                                <input type="checkbox" checked={crt} onChange={e => setCrt(e.target.checked)} />
                            </label>
                            <button className="p-1 rounded shadow" onClick={onFullscreen}>Fullscreen</button>
                        </div>
                    </div>
                    <div className="border rounded shadow divide-y">
                        <div className="text-center font-bold">Debug</div>
                        {/* <Debug {...debug} /> */}
                    </div>
                    <div className="border rounded shadow divide-y">
                        <div className="text-center font-bold">RAM</div>
                        {/* <HexViewer buffer={debug?.ram || []} /> */}
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
