import React, { useRef } from 'react';

import { ROMSelector, EmulatorContext, UI } from '../common';
import { useEmulator, useInput, useSettings } from './hooks';
import { Display } from './Display';
import { Settings } from './Settings';
import { ModuleMeta } from './ModuleMeta';
import { ModuleStats } from './ModuleStats';
import { ModuleInput } from './ModuleInput';
import { ModuleDebug } from './ModuleDebug';

import content from '../assets/chip8.content.png';

const modules = {
    meta: <ModuleMeta />,
    stats: <ModuleStats />,
    input: <ModuleInput />,
    debug: <ModuleDebug />,
};

export const Chip8 = () => {
    const canvas = useRef(null);

    const settings = useSettings();
    const emulator = useEmulator(settings, canvas);
    const input = useInput(settings.input.map, { onInput: emulator.input });

    return (
        <EmulatorContext.Provider value={{
            meta: {
                name: emulator.emulator?.rom?.name,
            },
            input,
            debug: emulator.debug,
            settings,
        }}>
            <UI
                settings={<Settings />}
                display={<Display ref={canvas} width={64} height={32} crt={settings.ui.crt} />}
                select={<ROMSelector picture={content} onSelect={emulator.load} />}
                modules={Object.entries(modules).filter(([id]) => settings.modules.includes(id))}
                init={!!emulator.emulator}
                error={emulator.error}
                onStart={emulator.start}
                onPause={emulator.pause}
                onStop={emulator.stop}
            />
        </EmulatorContext.Provider>
    );
};
