import React, { useContext } from 'react';

import { HexViewer } from '../../../../common';
import { EmulatorContext } from '../context';

export const Memory = () => {
    const { emulator } = useContext(EmulatorContext);

    return emulator?.debug ? (
        <HexViewer buffer={emulator.debug.bus.ram || []} className="h-full overflow-auto" />
    ) : (
        <p className="h-full flex items-center justify-center">No data :(</p>
    );
};
