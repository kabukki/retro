import React, { useContext } from 'react';

import { EmulatorContext } from '../common';

export const ModuleDebug = () => {
    const { debug } = useContext(EmulatorContext);

    return (
        <aside className="p-4 rounded bg-black bg-opacity-25 text-center">
            <h2 className="font-bold">Last insruction</h2>
            <pre>{debug.lastInstruction}</pre>
        </aside>
    );
};
