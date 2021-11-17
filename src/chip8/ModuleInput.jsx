import React, { useContext } from 'react';

import { EmulatorContext, Module } from '../common';
import { Keypad } from './Keypad';

export const ModuleInput = () => {
    const { input } = useContext(EmulatorContext);

    return (
        <Module className="text-center">
            <Keypad input={input} />
        </Module>
    );
};
