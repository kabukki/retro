import React, { useState, useContext, useMemo } from 'react';
import { Tab } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrochip, faMemory, faMusic, faGamepad, faBug, faGauge, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { Status } from '@kabukki/wasm-chip8';
import classNames from 'classnames';

import { ROMSelector } from '../../../common';
import { Cpu, Performance, Audio, Video, Input, StatusBar, Memory, SettingsProvider, Settings, Logs } from './components';
import { EmulatorProvider, EmulatorContext } from './context';
import { useInput } from './hooks';

import picture from './assets/picture.png';
import content from './assets/content.png';

const tabs = [
    { name: 'Performance', icon: faGauge, component: Performance, unmount: true },
    { name: 'CPU', icon: faMicrochip, component: Cpu, unmount: true },
    { name: 'Logs', icon: faClockRotateLeft, component: Logs, unmount: true },
    { name: 'RAM', icon: faMemory, component: Memory, unmount: true },
    { name: 'Audio', icon: faMusic, component: Audio, unmount: true },
    { name: 'Input', icon: faGamepad, component: Input, unmount: true },
];

export const Chip8 = () => {
    const { create, emulator } = useContext(EmulatorContext);
    const [advanced, setAdvanced] = useState(true);
    const [{ keymap }] = useContext(Settings);

    const mapping = useMemo(() => [
        ['Escape', 'keydown', (emulator?.status === Status.RUNNING) ? emulator.stop.bind(emulator) : (emulator?.status === Status.IDLE) ? emulator.start.bind(emulator) : () => {}],
        ...Object.entries(keymap).flatMap(([key, mapped]) => [
            [mapped, 'keydown', () => emulator.input(key, true)],
            [mapped, 'keyup', () => emulator.input(key, false)],
        ]),
    ], [emulator?.status, keymap]);

    useInput(mapping);

    return emulator ? (
        <div className="h-0 flex-1 flex flex-col divide-y">
            <main className={classNames('h-0 flex-1 grid divide-y', { ['grid-rows-2']: advanced })}>
                <div className="relative min-h-0">
                    <Video className="h-full w-full" />
                    {emulator.error && (
                        <div className="absolute inset-0 flex flex-col justify-center items-center backdrop-blur-xl text-red-500">
                            <FontAwesomeIcon icon={faBug} className="h-8" />
                            <h2 className="text-center">{emulator.error.message}</h2>
                        </div>
                    )}
                </div>
                {advanced && (
                    <Tab.Group vertical className="flex items-stretch divide-x" as="section">
                        <Tab.List className="bg-white overflow-auto" as="nav">
                            {tabs.map(({ name, icon }) => (
                                <Tab key={name} className={({ selected }) => `block w-full aspect-square p-4 ${selected ? 'bg-green-100 text-green-700' : ''}`} as="button">
                                    <FontAwesomeIcon icon={icon} className="w-4" />
                                </Tab>
                            ))}
                        </Tab.List>
                        <Tab.Panels className="flex-1 overflow-auto">
                            {tabs.map(({ name, component: Component, unmount }) => (
                                <Tab.Panel key={name} className="h-full flex flex-col" unmount={unmount}>
                                    <h1 className="p-2 bg-white text-green-700 font-bold shadow">{name}</h1>
                                    <div className="flex-1 overflow-auto">
                                        <Component />
                                    </div>
                                </Tab.Panel>
                            ))}
                        </Tab.Panels>
                    </Tab.Group>
                )}
            </main>
            <StatusBar advanced={advanced} onAdvanced={setAdvanced} />
        </div>
    ) : (
        <div className="m-auto">
            <ROMSelector picture={content} onSelect={create} />
        </div>
    );
};

export default {
    name: 'CHIP-8',
    developer: 'Weisbecker',
    year: 1978,
    generation: null,
    wikipedia: 'https://en.wikipedia.org/wiki/CHIP-8',
    github: 'https://github.com/kabukki/wasm-chip8',
    picture,
    content,
    path: '/other/chip8',
    component () {
        return (
            <EmulatorProvider>
                <SettingsProvider>
                    <Chip8 />
                </SettingsProvider>
            </EmulatorProvider>
        );
    },
};
