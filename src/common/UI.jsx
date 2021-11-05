import React, { cloneElement, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';

import { useKeyboard } from '.';

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

export const UI = ({
    title, settings, display, select, modules,
    init, error, onPause, onStart, onReset, onStop,
}) => {
    const [running, setRunning] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

    const _onOpenSettings = () => setSettingsOpen(true);
    const _onCloseSettings = () => setSettingsOpen(false);
    const _onStop = () => {
        onStop();
        _onCloseSettings();
    };
    const _onReset = () => {
        onReset();
        _onCloseSettings();
    };
    const _onPause = () => {
        onPause();
        setRunning(false);
    };
    const _onStart = () => {
        onStart();
        setRunning(true);
    };

    useKeyboard({
        Escape: () => setSettingsOpen((previous) => !previous),
    });

    useEffect(() => {
        if (settingsOpen) {
            _onPause();
        } else {
            _onStart();
        }
    }, [settingsOpen]);

    return (
        <main className="relative flex-1 flex flex-col">
            {display}
            <TransitionFade
                show={settingsOpen}
                unmount={false}
                className="absolute z-10 inset-0 p-4 mx-auto text-white backdrop-filter backdrop-blur-lg backdrop-brightness-50 overflow-auto"
            >
                <div className="flex flex-col gap-4 container mx-auto h-full">
                    {settings}
                    <div className="flex justify-center gap-4">
                        <button className="p-1 text-red-500" onClick={_onStop}>Stop</button>
                        {onReset && <button className="p-1 text-yellow-500" onClick={_onReset}>Reset</button>}
                        <button onClick={_onCloseSettings}>Resume</button>
                    </div>
                </div>
            </TransitionFade>
            <TransitionSlide show={!init} className="absolute z-20 inset-0 grid place-content-center text-center text-white bg-green-700">
                <Background className="text-green-900" text={title}>
                    {select}
                </Background>
            </TransitionSlide>
            <TransitionSlide show={!!error} className="absolute z-20 inset-0 grid place-content-center text-center text-white bg-red-700">
                <Background className="text-red-900" text={title}>
                    <h1 className="font-bold">{error?.message}</h1>
                </Background>
            </TransitionSlide>
            {init && (
                <>
                    <div className="absolute top-0 right-0 h-full p-4 flex flex-col items-stretch gap-4 text-white overflow-auto">
                        {modules.map(([key, module]) => cloneElement(module, { key }))}
                    </div>
                    <div className="absolute top-4 left-4 flex gap-4 text-white">
                        <button onClick={_onOpenSettings}>⚙️</button>
                        {running ? <button onClick={_onPause}>⏸</button> : <button onClick={_onStart}>▶️</button>}
                        <button onClick={_onReset}>🔁</button>
                        <button onClick={_onStop}>⏹</button>
                    </div>
                </>
            )}
        </main>
    );
};
