import React, { useRef } from 'react';

import { ROMSelector, EmulatorContext, UI } from '../common';
import { useEmulator, useInput, useSettings } from './hooks';
import { Display } from './Display';
import { Settings } from './Settings';
import { ModuleAudio } from './ModuleAudio';
import { ModuleCartridge } from './ModuleCartridge';
import { ModuleInput } from './ModuleInput';
import { ModulePerformance } from './ModulePerformance';
import { ModulePPU } from './ModulePPU';
import { ModuleRAM } from './ModuleRAM';

import content from '../assets/nes.content.png';

const modules = {
    audio: <ModuleAudio />,
    cartridge: <ModuleCartridge />,
    input: <ModuleInput />,
    performance: <ModulePerformance />,
    ppu: <ModulePPU />,
    ram: <ModuleRAM />,
};

export const Nes = (meta) => {
    const canvas = useRef(null);

    const { emulator, saves, debug, error, load, stop } = useEmulator(canvas);
    const settings = useSettings();
    const input = useInput(2, {
        onInput: (index, value) => {
            emulator?.input(index, value);
        },
    });

    return (
        <EmulatorContext.Provider value={{
            meta,
            rom: emulator?.rom,
            input,
            debug,
            saves,
            settings,
        }}>
            <UI
                title={meta.title}
                settings={<Settings />}
                display={<Display ref={canvas} width={256} height={240} crt={settings.crt} />}
                select={<ROMSelector picture={content} onSelect={load} />}
                modules={Object.entries(modules).filter(([id]) => settings.modules.includes(id))}
                emulator={emulator}
                onStop={stop}
                error={error}
            />
        </EmulatorContext.Provider>
    );
};
