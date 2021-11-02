import React, { useRef } from 'react';

import { ROMSelector, EmulatorContext, UI } from '../common';
import { useEmulator, useInput, useSettings } from './hooks';
import { Display } from './Display';
import { Settings } from './Settings';
import { ModuleMeta } from './ModuleMeta';
import { ModuleStats } from './ModuleStats';
import { ModuleInput } from './ModuleInput';
import { ModuleRAM } from './ModuleRAM';
import { ModulePPU } from './ModulePPU';

import content from '../assets/nes.content.png';

const modules = {
    meta: <ModuleMeta />,
    stats: <ModuleStats />,
    input: <ModuleInput />,
    ram: <ModuleRAM />,
    ppu: <ModulePPU />,
};

export const Nes = () => {
    const canvas = useRef(null);

    const emulator = useEmulator(canvas);
    const input = useInput(2, { onInput: emulator.input });
    const settings = useSettings();

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
            <UI
                settings={<Settings />}
                display={<Display ref={canvas} width={256} height={240} crt={settings.crt} />}
                select={<ROMSelector picture={content} onSelect={emulator.load} />}
                modules={Object.entries(modules).filter(([id]) => settings.modules.includes(id))}
                init={!!emulator.emulator}
                error={emulator.error}
                onStart={emulator.start}
                onPause={emulator.pause}
                onReset={emulator.reset}
                onStop={emulator.stop}
            />
        </EmulatorContext.Provider>
    );
};
