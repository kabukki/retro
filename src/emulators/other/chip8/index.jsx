import React, { lazy } from 'react';
import { EmulatorProvider, init, meta, useLifecycle } from '@kabukki/wasm-chip8';

import Chip8 from './Chip8';

export default {
    ...meta,
    path: '/other/chip8',
    component: lazy(() => init().then(() => ({
        default () {
            return (
                <EmulatorProvider>
                    <Chip8 />
                </EmulatorProvider>
            );
        },
    }))),
};
