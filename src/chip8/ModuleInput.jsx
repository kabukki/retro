import React, { useContext } from 'react';

import { EmulatorContext } from '../common';
import { Keypad } from './Keypad';

export const ModuleInput = () => {
    const { input } = useContext(EmulatorContext);

    return (
        <aside className="p-4 rounded bg-black bg-opacity-25 text-center">
            <h2 className="font-bold">Input</h2>
            <Keypad input={input} />
        </aside>
    );
};
