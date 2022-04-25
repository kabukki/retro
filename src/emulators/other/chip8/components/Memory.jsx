import React from 'react';
import { useDebug } from '@kabukki/wasm-chip8';

import { HexViewer } from '../../../../common';

export const Memory = () => {
    const { emulator } = useDebug();

    return (
        <HexViewer buffer={emulator?.memory.ram} className="h-full w-full" />
    );
};
