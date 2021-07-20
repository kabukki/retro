import React, { useCallback, useEffect, useState } from 'react';
import { Emulator } from '@kabukki/wasm-chip8';
import { Helmet } from 'react-helmet';
import merge from 'lodash.merge';

import { hex } from '../utils';
import { ROMSelector } from '../ROMSelector';
import { Display } from './Display';
import { Settings } from './Settings';
import { Keypad } from './Keypad';
import { EmulatorAudio } from './audio';

const audio = new EmulatorAudio('sine');

export const Chip8 = () => {
    const [lastInstruction, setLastInstruction] = useState(null);
    const [framebuffer, setFramebuffer] = useState(null);
    const [emulator, setEmulator] = useState(null);
    const [error, setError] = useState(null);
    const [rom, setRom] = useState(null);
    const [settings, setSettings] = useState({
        core: {
            clockSpeed: 1000 / 200,
            timerFrequency: 1000 / 60,
        },
        display: {
            colorOn: '#ffffff',
            colorOff: '#000000',
            refreshRate: 30,
        },
        audio: true,
        keyboard: {
            map: {
                '1': 0x1, '2': 0x2, '3': 0x3, '4': 0xC,
                'q': 0x4, 'w': 0x5, 'e': 0x6, 'r': 0xD,
                'a': 0x7, 's': 0x8, 'd': 0x9, 'f': 0xE,
                'z': 0xA, 'x': 0x0, 'c': 0xB, 'v': 0xF,
            },
        },
    });

    // Keyboard shortcuts
    const onKeydown = useCallback(({ key }) => key in settings.keyboard.map && emulator?.keydown(settings.keyboard.map[key]), [emulator]);
    const onKeyup = useCallback(({ key }) => key in settings.keyboard.map && emulator?.keyup(settings.keyboard.map[key]), [emulator]);

    useEffect(() => {
        document.addEventListener('keydown', onKeydown);
        document.addEventListener('keyup', onKeyup);

        return () => {
            document.removeEventListener('keydown', onKeydown);
            document.removeEventListener('keyup', onKeyup);    
        };
    }, [onKeydown, onKeyup]);

    // When emulator changes, start/stop
    useEffect(() => {
        if (emulator) {
            try {
                emulator.start({
                    clockSpeed: settings.core.clockSpeed,
                    timerFrequency: settings.core.timerFrequency,
                    refreshRate: settings.display.refreshRate,
                    onError (err) {
                        console.log('onError');
                        console.error(err);
                        setError(err);
                        emulator.stop();
                    },
                    onCPU: (opcode) => setLastInstruction(hex(opcode)),
                    onTimer: (shouldBeep) => {
                        if (settings.audio) {
                            if (shouldBeep) {
                                audio.play();
                            } else {
                                audio.pause();
                            }
                        }
                    },
                    onDisplay: setFramebuffer,
                });
    
                return () => {
                    emulator.stop();
                    setEmulator(null);
                    setFramebuffer(null);
                };
            } catch (err) {
                console.error(err);
                setError(err);
            }
        }
    }, [emulator]);

    // When a ROM is loaded, create a new emulator instance
    useEffect(() => {
        if (rom) {
            try {
                setEmulator(new Emulator(rom));
            } catch (err) {
                console.dir(err)
                setError(err);
            }
        }
    }, [rom]);

    return (
        <div>
            <Helmet>
                <title>CHIP-8</title>
            </Helmet>
            <div className="relative flex gap-4">
                <Display framebuffer={framebuffer} width={64} height={32} scale={8} settings={settings.display} />
                <div>
                    <Keypad onKeydown={(key) => emulator?.keydown(key)} onKeyup={(key) => emulator?.keyup(key)}/>
                    <pre>{lastInstruction}</pre>
                    <button onClick={() => setEmulator(null)}>❌ End</button>
                </div>
                {!emulator && (
                    <div className="absolute inset-0 flex flex-col justify-center bg-gray-500 bg-opacity-50">
                        <div className="py-4 bg-gray-500 text-center text-white" >
                            <ROMSelector onSelect={setRom} />
                        </div>
                    </div>
                )}
                {error && (
                    <div className="absolute inset-0 flex flex-col justify-center bg-gray-500 bg-opacity-50">
                        <div className="py-4">
                            <pre className="py-4 bg-red-500 text-center text-white">{error.message}</pre>
                        </div>
                    </div>
                )}
            </div>
            <div>
                <Settings settings={settings} onUpdate={(newSettings) => setSettings((oldSettings) => merge({}, oldSettings, newSettings))} />
                <div className="space-y-4">
                    <div>
                        <h2 className="border-b border-grey-500">⏱ Stats</h2>
                        <p><b>CPU clock speed</b> {Math.round(1000 / settings.core.clockSpeed)}Hz</p>
                        <p><b>Timer frequency</b> {Math.round(1000 / settings.core.timerFrequency)}Hz</p>
                        <p><b>Display refresh rate</b> {settings.display.refreshRate} FPS</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
