import React, { useEffect, useRef, useState } from 'react';

import { ROMSelector } from '../ROMSelector';
import { Display } from './Display';
import { StatusBar } from './StatusBar';
import { Controller } from './Controller';
import { useEmulator, useInput } from './hooks';

export const Nes = () => {
    const canvas = useRef(null);
    const [rom, setRom] = useState(null);
    const [scale, setScale] = useState(2);
    const { start, stop, load, input, debug, error } = useEmulator(canvas);
    const [player1, player1Gamepad] = useInput({ keyboard: true, gamepad: 0 });
    const [player2, player2Gamepad] = useInput({ gamepad: 1 });
    
    useEffect(() => {
        input(0, player1);
    }, [player1]);

    useEffect(() => {
        input(1, player2);
    }, [player2]);

    useEffect(() => {
        if (rom) {
            load(rom.buffer);
            start();
            return stop;
        }
    }, [rom]);

    return (
        <main className="container mx-auto p-4 flex flex-col ">
            <div className="mx-auto border rounded shadow overflow-hidden divide-y">
                <div className="text-center text-green-700 font-mono font-bold">
                    {rom ? rom.name : '...Waiting for ROM...'}
                </div>
                <div className="relative">
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
            <div className="sm:flex mx-auto">
                <div>
                    <div className="mx-auto w-2 h-10 bg-black"></div>
                    <Controller input={player1} keyboard gamepad={player1Gamepad} />
                </div>
                {player2Gamepad && (
                    <div>
                        <div className="mx-auto w-2 h-10 bg-black"></div>
                        <Controller input={player2} gamepad />
                    </div>
                )}
            </div>
            {rom && (
                <div>
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
