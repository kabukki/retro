import React, { lazy, useState, useContext } from 'react';
import { Tab } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrochip, faMemory, faMusic, faGamepad, faBolt, faScissors, faBug } from '@fortawesome/free-solid-svg-icons';
import { EmulatorProvider, init, useLifecycle, useIO, Status } from '@kabukki/wasm-chip8';
import classNames from 'classnames';

import { ROMSelector, useInput } from '../../../common';
import { Cpu, Performance, Audio, Video, Input, StatusBar, Memory, Disassembly, SettingsProvider, Settings } from './components';

import picture from './assets/picture.png';
import content from './assets/content.png';
import { useMemo } from 'react';

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
                                <Tab className={({ selected }) => `block w-full aspect-square p-4 ${selected ? 'bg-green-100 text-green-700' : ''}`} as="button">
                                <FontAwesomeIcon icon={faBolt} className="w-4" />
                                </Tab>
                                <Tab className={({ selected }) => `block w-full aspect-square p-4 ${selected ? 'bg-green-100 text-green-700' : ''}`} as="button">
                                    <FontAwesomeIcon icon={faMicrochip} className="w-4" />
                                </Tab>
                                <Tab className={({ selected }) => `block w-full aspect-square p-4 ${selected ? 'bg-green-100 text-green-700' : ''}`} as="button">
                                    <FontAwesomeIcon icon={faMemory} className="w-4" />
                                </Tab>
                                <Tab className={({ selected }) => `block w-full aspect-square p-4 ${selected ? 'bg-green-100 text-green-700' : ''}`} as="button">
                                    <FontAwesomeIcon icon={faScissors} className="w-4" />
                                </Tab>
                                <Tab className={({ selected }) => `block w-full aspect-square p-4 ${selected ? 'bg-green-100 text-green-700' : ''}`} as="button">
                                    <FontAwesomeIcon icon={faMusic} className="w-4" />
                                </Tab>
                                <Tab className={({ selected }) => `block w-full aspect-square p-4 ${selected ? 'bg-green-100 text-green-700' : ''}`} as="button">
                                    <FontAwesomeIcon icon={faGamepad} className="w-4" />
                                </Tab>
                            </Tab.List>
                            <Tab.Panels className="flex-1 overflow-auto">
                                <Tab.Panel>
                                    <h1 className="p-2 sticky top-0 bg-white shadow">Performance</h1>
                                    <Performance />
                                </Tab.Panel>
                                <Tab.Panel>
                                    <h1 className="p-2 sticky top-0 bg-white shadow">CPU</h1>
                                    <Cpu />
                                </Tab.Panel>
                                <Tab.Panel>
                                    <h1 className="p-2 sticky top-0 bg-white shadow">Memory</h1>
                                    <Memory />
                                </Tab.Panel>
                                <Tab.Panel className="h-full flex flex-col" unmount={false}>
                                    <h1 className="p-2 bg-white shadow">Disassembly</h1>
                                    <Disassembly className="flex-1"/>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <h1 className="p-2 sticky top-0 bg-white shadow">Audio</h1>
                                    <Audio />
                                </Tab.Panel>
                                <Tab.Panel>
                                    <h1 className="p-2 sticky top-0 bg-white shadow">Input</h1>
                                    <Input />
                                </Tab.Panel>
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
