import React, { useRef } from 'react';

import { ROMSelector, EmulatorContext, UI } from '../common';
import { useEmulator, useInput, useSettings } from './hooks';
import { Display } from './Display';
import { Settings } from './Settings';
import { ModuleAudio } from './ModuleAudio';
import { ModuleCartridge } from './ModuleCartridge';
import { ModuleDebug } from './ModuleDebug';
import { ModuleInput } from './ModuleInput';
import { ModulePerformance } from './ModulePerformance';

import content from '../assets/chip8.content.png';

const modules = {
    audio: <ModuleAudio />,
    cartridge: <ModuleCartridge />,
    debug: <ModuleDebug />,
    input: <ModuleInput />,
    performance: <ModulePerformance />,
};

export const Chip8 = (meta) => {
    const canvas = useRef(null);

    const settings = useSettings();
    const { emulator, debug, error, load, stop } = useEmulator(settings, canvas);
    const input = useInput(settings.input.map, {
        onInput (key, state) {
            emulator?.input(key, state);
        },
    });

    return (
        <EmulatorContext.Provider value={{
            meta,
            emulator,
            input,
            debug,
            settings,
        }}>
            <UI
                title={meta.title}
                settings={<Settings />}
                display={<Display ref={canvas} width={64} height={32} crt={settings.ui.crt} />}
                select={<ROMSelector picture={content} onSelect={load} />}
                modules={Object.entries(modules).filter(([id]) => settings.modules.includes(id))}
                emulator={emulator}
                onStop={stop}
                error={error}
            />
        </EmulatorContext.Provider>
    );
};
