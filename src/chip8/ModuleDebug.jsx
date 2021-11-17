import React, { useContext } from 'react';

import { EmulatorContext, Module } from '../common';
import { hex } from '../utils';

export const ModuleDebug = () => {
    const { debug } = useContext(EmulatorContext);

    return (
        <Module>
            <h2 className="font-bold">Last insruction</h2>
            <pre>{debug.lastInstruction ? hex(debug.lastInstruction.opcode) : '-'}</pre>
        </Module>
    );
};
