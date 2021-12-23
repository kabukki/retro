import React, { useRef } from 'react';

import { EmulatorContext, Display, UI } from '../../../common';
import { useEmulator, useInput, useSettings } from './hooks';
import * as modules from './modules';

export default (meta) => {
    const canvas = useRef();
    const settings = useSettings();
    const { emulator, saves, debug, error, load, stop } = useEmulator(canvas);
    const input = useInput(2, {
        onInput (index, value) {
            emulator?.input(index, value);
        },
    });

    return (
        <EmulatorContext.Provider value={{
            meta,
            emulator,
            input,
            debug,
            saves,
            settings,
        }}>
            <UI
                modules={modules}
                display={<Display ref={canvas} width={256} height={240} crt={settings.crt} />}
                onSelect={load}
                onStop={stop}
                error={error}
            />
        </EmulatorContext.Provider>
    );
};
