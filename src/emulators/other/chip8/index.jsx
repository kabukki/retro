import React, { lazy, useState, useContext } from 'react';
import { Tab } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrochip, faMemory, faMusic, faGamepad, faScissors, faBug, faGauge } from '@fortawesome/free-solid-svg-icons';
import { EmulatorProvider, init, useLifecycle, useIO, Status } from '@kabukki/wasm-chip8';
import classNames from 'classnames';

import { ROMSelector, useInput } from '../../../common';
import { Cpu, Performance, Audio, Video, Input, StatusBar, Memory, Disassembly, SettingsProvider, Settings } from './components';

import picture from './assets/picture.png';
import content from './assets/content.png';
import { useMemo } from 'react';

const tabs = [
    { name: 'Performance', icon: faGauge, component: Performance, unmount: true },
    { name: 'CPU', icon: faMicrochip, component: Cpu, unmount: true },
    { name: 'Memory', icon: faMemory, component: Memory, unmount: false },
    { name: 'Disassembly', icon: faScissors, component: Disassembly, unmount: false },
    { name: 'Audio', icon: faMusic, component: Audio, unmount: true },
    { name: 'Input', icon: faGamepad, component: Input, unmount: true },
];

export const Chip8 = () => {
    const { input } = useIO();
    const { create, status, error, start, stop } = useLifecycle();
    const [advanced, setAdvanced] = useState(true);
    const [{ keymap }] = useContext(Settings);

    const mapping = useMemo(() => [
        ['Escape', 'keydown', (status === Status.RUNNING) ? stop : (status === Status.IDLE) ? start : () => {}],
        ...Object.entries(keymap).flatMap(([key, mapped]) => [
            [mapped, 'keydown', () => input(key, true)],
            [mapped, 'keyup', () => input(key, false)],
        ]),
    ], [status, keymap]);

    useInput(mapping);

    if (status === Status.NONE) {
        return (
            <div className="m-auto">
                <ROMSelector picture={content} onSelect={create} />
            </div>
        );
    } else {
        // TODO transition between screens
        return (
            <div className="h-0 flex-1 flex flex-col divide-y">
                <main className={classNames('h-0 flex-1 grid divide-y', { ['grid-rows-2']: advanced })}>
                    {error ? (
                        <div className="m-auto text-center text-red-700">
                            <FontAwesomeIcon icon={faBug} className="w-4" />
                            <h2>{error.message}</h2>
                        </div>
                    ) : (
                        <Video />
                    )}
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
                                        <div className="flex-1">
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
        );
    }
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
    component: lazy(() => init().then(() => ({
        default () {
            return (
                <EmulatorProvider>
                    <SettingsProvider>
                        <Chip8 />
                    </SettingsProvider>
                </EmulatorProvider>
            );
        },
    }))),
};
