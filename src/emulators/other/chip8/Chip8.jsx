import React from 'react';
import { meta, useLifecycle, useStatus, useIO, Status } from '@kabukki/wasm-chip8';
import { Tab } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrochip, faMemory, faMusic, faGamepad } from '@fortawesome/free-solid-svg-icons';

import { ROMSelector } from '../../../common';
import { Cpu, Performance, Audio, Video, Input } from './modules';
import { useInput } from './hooks';

export default () => {
    const { input } = useIO();
    const { status, error } = useStatus();
    const { create, start, stop, destroy } = useLifecycle();

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
                <ROMSelector picture={meta.content} onSelect={create} />
            </div>
        );
    } else {
        return (
            <main className="p-2 flex gap-2 bg-gray-100">
                <Tab.Group className="flex flex-1 border rounded overflow-hidden bg-white divide-x" as="section">
                    <Tab.List as="nav">
                        <Tab className={({ selected }) => `block w-full aspect-square p-4 ${selected ? 'bg-green-100 text-green-700' : ''}`} as="button">
                            <FontAwesomeIcon icon={faMicrochip} className="w-4" />
                        </Tab>
                        <Tab className={({ selected }) => `block w-full aspect-square p-4 ${selected ? 'bg-green-100 text-green-700' : ''}`} as="button">
                            <FontAwesomeIcon icon={faMemory} className="w-4" />
                        </Tab>
                        <Tab className={({ selected }) => `block w-full aspect-square p-4 ${selected ? 'bg-green-100 text-green-700' : ''}`} as="button">
                            <FontAwesomeIcon icon={faMusic} className="w-4" />
                        </Tab>
                        <Tab className={({ selected }) => `block w-full aspect-square p-4 ${selected ? 'bg-green-100 text-green-700' : ''}`} as="button">
                            <FontAwesomeIcon icon={faGamepad} className="w-4" />
                        </Tab>
                    </Tab.List>
                    <Tab.Panels className="flex-1">
                        <Tab.Panel className="divide-y">
                            <h1 className="p-2">CPU</h1>
                            <Cpu />
                        </Tab.Panel>
                        <Tab.Panel className="divide-y">
                            <h1 className="p-2">Memory</h1>
                            <div className="p-2">
                                Todo disassembly
                            </div>
                        </Tab.Panel>
                        <Tab.Panel className="divide-y">
                            <h1 className="p-2">Audio</h1>
                            <div className="p-2">
                                <Audio />
                            </div>
                        </Tab.Panel>
                        <Tab.Panel className="divide-y">
                            <h1 className="p-2">Input</h1>
                            <Input />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
                <section className="flex-1 border rounded overflow-hidden divide-y bg-white">
                    <Video />
                    <div className="p-2 flex justify-center gap-2">
                        {status === Status.RUNNING ? <button onClick={stop}>⏸</button> : <button onClick={start}>▶️</button>}
                        <button>⏩</button>
                        <button onClick={destroy}>⏹</button>
                        <button>🔄</button>
                    </div>
                    <Performance />
                </section>
            </main>
        );
    }
};
