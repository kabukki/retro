import React, { useContext, useEffect, useState } from 'react';
import { Transition, Tab } from '@headlessui/react';

import { EmulatorContext, ROMSelector, useKeyboard } from '.';

import Bug from '../assets/bug.svg';

const TransitionFade = ({ children, ...props }) => (
    <Transition
        {...props}
        enter="transition ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        leave="transition ease-out"
    >
        {children}
    </Transition>
);

const TransitionSlide = ({ children, ...props }) => (
    <Transition
        {...props}
        enter="transition ease-out transform"
        enterFrom="-translate-y-full"
        enterTo="translate-y-0"
        leaveFrom="translate-y-0"
        leaveTo="-translate-y-full"
        leave="transition ease-out transform"
    >
        {children}
    </Transition>
);

const Background = ({ text, className, children }) => (
    <>
        <div className={`absolute inset-0 pointer-events-none select-none grid grid-cols-5 grid-rows-5 place-items-center gap-4 whitespace-nowrap ${className || ''}`}>
            {Array.from({ length: 25 }, (v, n) => (
                <div key={n}>
                    {n % 2 === 0 ? text : '·'}
                </div>
            ))}
        </div>
        <div className="z-10">
            {children}
        </div>
    </>
);

export const UI = ({ modules, display, error, onSelect, onStop }) => {
    const [pause, setPause] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(true);
    const { meta, emulator, debug } = useContext(EmulatorContext);

    const _onStop = () => {
        onStop();
        setPause(false);
    };
    const _onReset = () => {
        emulator?.reset();
        setPause(false);
    };

    useKeyboard({
        Escape: () => setPause((previous) => !previous),
    });

    useEffect(() => {
        if (pause) {
            emulator?.stop();
        } else {
            emulator?.start();
        }
    }, [pause]);

    return (
        <main className="relative flex-1 flex flex-col min-h-0">
            <div className="h-full flex">
                {settingsOpen && (
                    <div className="h-full resize-x overflow-x-auto">
                        <UI.Debug panels={modules} />
                    </div>
                )}
                <div className="relative flex-1">
                    {display}
                    {debug ? <span className="absolute top-4 right-4 text-white font-mono">{debug?.performance?.fps?.toString() || '-'}</span> : null}
                    {emulator && (
                        <Bug className="absolute top-4 left-4 w-4 h-4 text-white cursor-pointer" onClick={() => setSettingsOpen((previous) => !previous)} />
                    )}
                    <TransitionFade show={pause} className="absolute z-10 inset-0 text-white backdrop-filter backdrop-blur-lg backdrop-brightness-50 overflow-auto">
                        <div className="h-full flex flex-col justify-center gap-4">
                            <h1 className="text-shadow text-center text-8xl tracking-widest font-mono font-bold animate-color">
                                PAUSE
                            </h1>
                            <ul className="flex gap-4 items-center justify-center">
                                <li><button onClick={() => setPause(false)}>Resume</button></li>
                                <li><button className="p-1 text-yellow-500" onClick={_onReset}>Reset</button></li>
                                <li><button className="p-1 text-red-500" onClick={_onStop}>Stop</button></li>
                            </ul>
                        </div>
                    </TransitionFade>
                </div>
            </div>
            <TransitionSlide show={!emulator} className="absolute z-20 inset-0 grid place-content-center text-center text-white bg-green-700">
                <Background className="text-green-900" text={meta.name}>
                    <ROMSelector picture={meta.content} onSelect={onSelect} />
                </Background>
            </TransitionSlide>
            <TransitionSlide show={!!error} className="absolute z-20 inset-0 grid place-content-center text-center text-white bg-red-700">
                <Background className="text-red-900" text={meta.name}>
                    <h1 className="font-bold">{error?.message}</h1>
                </Background>
            </TransitionSlide>
        </main>
    );
};

UI.Debug = ({ panels }) => (
    <Tab.Group className="h-full flex flex-wrap overflow-hidden" as="aside">
        <Tab.List className="flex-0 sm:flex-row bg-white relative shadow" as="ul">
            {Object.values(panels).map((Component) => (
                <Tab key={Component.name} className={({ selected }) => `p-4 flex gap-x-4 items-center cursor-pointer ${selected ? 'font-bold text-green-700' : ''}`} as="li">
                    {Component.Icon && <Component.Icon className="w-4 h-4 text-current" />} {Component.name}
                </Tab>
            ))}
        </Tab.List>
        <Tab.Panels className="h-full flex-1 p-4 bg-gray-100 overflow-auto">
            {Object.values(panels).map((Component) => (
                <Tab.Panel key={Component.name}>
                    <Component />
                </Tab.Panel>
            ))}
        </Tab.Panels>
    </Tab.Group>
);
