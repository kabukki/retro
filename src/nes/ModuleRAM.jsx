import React, { useContext } from 'react';

import { HexViewer, EmulatorContext } from '../common';

export const ModuleRAM = () => {
    const { debug } = useContext(EmulatorContext);

    return (
        <aside className="p-4 rounded bg-black bg-opacity-25 text-center">
            <h2>RAM</h2>
            <HexViewer buffer={debug?.ram || []} />
        </aside>
    );
};