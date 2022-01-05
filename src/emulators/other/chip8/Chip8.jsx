import React, { useRef } from 'react';

import { EmulatorContext, Display, UI } from '../../../common';
import { useEmulator, useInput, useSettings } from './hooks';
import * as modules from './modules';

export default (meta) => {
    const canvas = useRef(null);
    const settings = useSettings();
    const { emulator, debug, error, load, stop } = useEmulator(settings, canvas);
    const input = useInput(settings.input.map, {
        onInput (key, state) {
            emulator?.input(key, state);
        },
    });

    return (
        <EmulatorContext.Provider value={{
            meta,
            emulator,
            input,
            debug,
            settings,
        }}>
            <UI
                modules={modules}
                display={<Display ref={canvas} width={64} height={32} crt={settings.ui.crt} />}
                onSelect={load}
                onStop={stop}
                error={error}
            />
        </EmulatorContext.Provider>
    );
};
