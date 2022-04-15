import React, { lazy } from 'react';
import { Tab } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrochip, faMemory, faMusic, faGamepad, faBolt, faScissors } from '@fortawesome/free-solid-svg-icons';
import { EmulatorProvider, init, useLifecycle, useIO, Status } from '@kabukki/wasm-chip8';

import { ROMSelector } from '../../../common';
import { Cpu, Performance, Audio, Video, Input, StatusBar, Memory, Disassembly } from './modules';
import { useInput } from './hooks';

import picture from './assets/picture.png';
import content from './assets/content.png';
import { useState } from 'react';
import classNames from 'classnames';

export const Chip8 = () => {
    const { input } = useIO();
    const { create, status, error } = useLifecycle();
    const [advanced, setAdvanced] = useState(true);

    // const settings = useSettings();

    useInput({
        keymap: {
            '1': 0x1, '2': 0x2, '3': 0x3, '4': 0xC,
            'q': 0x4, 'w': 0x5, 'e': 0x6, 'r': 0xD,
            'a': 0x7, 's': 0x8, 'd': 0x9, 'f': 0xE,
            'z': 0xA, 'x': 0x0, 'c': 0xB, 'v': 0xF,
        },
        onInput: input,
    });

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
                        <h2 className="text-red-700 m-auto">{error.message}</h2>
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
                                    <h1 className="p-2 sticky top-0 bg-white shadow">Disassembly</h1>
                                    <Disassembly />
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
                    <Chip8 />
                </EmulatorProvider>
            );
        },
    }))),
};
