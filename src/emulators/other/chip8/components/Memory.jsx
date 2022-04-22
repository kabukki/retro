import React from 'react';
import { useDebug } from '@kabukki/wasm-chip8';

import { HexViewer } from '../../../../common';

export const Memory = () => {
    const { memory } = useDebug();

    return (
        <HexViewer buffer={memory.ram} />
    );
};
