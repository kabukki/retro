import React, { useEffect, useRef, useState } from 'react';
import { Transition } from '@headlessui/react';

import { ROMSelector, EmulatorContext } from '../common';
import { useEmulator, useInput, useSettings, useKeyboard } from './hooks';
import { Display } from './Display';
import { Settings } from './Settings';
import { ModuleMeta } from './ModuleMeta';
import { ModuleStats } from './ModuleStats';
import { ModuleInput } from './ModuleInput';
import { ModuleDebug } from './ModuleDebug';
import { ModuleRAM } from './ModuleRAM';

import nes from '../assets/nes.png';
import content from '../assets/nes.content.png';

export const Nes = () => {
    const canvas = useRef(null);
    const [settingsOpen, setSettingsOpen] = useState(false);

    const emulator = useEmulator(canvas);
    const input = useInput(2, { onInput: emulator.input });
    const settings = useSettings();

    const onOpen = () => setSettingsOpen(true);
    const onClose = () => setSettingsOpen(false);
    const onReset = () => {
        emulator.reset();
        onClose();
    };
    const onStop = () => {
        emulator.stop();
        onClose();
    };
    
    useKeyboard({
        Escape: () => setSettingsOpen((previous) => !previous),
    });

    useEffect(() => {
        if (emulator.emulator) {
            if (settingsOpen) {
                emulator.pause();
            } else {
                emulator.start();
            }
        }
    }, [settingsOpen]);
  
    return (
        <EmulatorContext.Provider value={{
            meta: {
                name: emulator.emulator?.rom?.name,
            },
            input,
            debug: emulator.debug,
            saves: emulator.saves,
            settings,
        }}>
            <main className="relative flex-1 flex flex-col font-mono">
                <Display ref={canvas} width={32 * 8} height={30 * 8} crt={settings.crt} />
                <Transition
                    show={settingsOpen}
                    unmount={false}
                    className="absolute z-10 inset-0 p-4 mx-auto text-white backdrop-filter backdrop-blur-lg backdrop-brightness-50 overflow-auto"
                    enter="transition ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    leave="transition ease-out"
                >
                    <Settings
                        onReset={onReset}
                        onStop={onStop}
                        onClose={onClose}
                    />
                </Transition>
                <Transition
                    show={!emulator.emulator}
                    className="absolute z-20 inset-0 grid place-content-center text-center text-white bg-green-700"
                    enter="transform transition"
                    enterFrom="-translate-y-full"
                    enterTo="translate-y-0"
                    leaveFrom="translate-y-0"
                    leaveTo="-translate-y-full"
                    leave="transform transition"
                >
                    <img src={nes} />
                    <ROMSelector content={content} onSelect={emulator.load} />
                </Transition>
                <Transition
                    show={!!emulator.error}
                    className="absolute z-20 inset-0 grid place-content-center text-center text-white bg-red-700"
                    enter="transform transition duration-500"
                    enterFrom="-translate-y-full"
                    enterTo="translate-y-0"
                    leaveFrom="translate-y-0"
                    leaveTo="-translate-y-full"
                    leave="transform transition duration-500"
                >
                    {emulator.error?.message}
                </Transition>
                {emulator.emulator && (
                    <>
                        <div className="absolute top-0 right-0 h-full p-4 flex flex-col items-stretch gap-4 text-white overflow-auto">
                            <ModuleMeta />
                            {settings.modules.includes('stats') && <ModuleStats />}
                            {settings.modules.includes('input') && <ModuleInput />}
                            {settings.modules.includes('debug') && <ModuleDebug />}
                            {settings.modules.includes('ram') && <ModuleRAM />}
                        </div>
                        <button className="absolute top-4 left-4 text-white" onClick={onOpen}>⚙️ Settings</button>
                    </>
                )}
            </main>
        </EmulatorContext.Provider>
    );
};
