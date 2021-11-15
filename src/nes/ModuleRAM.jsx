import React, { useContext } from 'react';

import { HexViewer, EmulatorContext } from '../common';

export const ModuleRAM = () => {
    const { debug } = useContext(EmulatorContext);

    return (
        <Module className="text-center">
            <h2>RAM</h2>
            <HexViewer buffer={debug?.ram || []} />
        </Module>
    );
};
