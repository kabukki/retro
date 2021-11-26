import React, { useRef } from 'react';

import { EmulatorContext, Display, UI } from '../../../common';
import { useEmulator, useInput, useSettings } from './hooks';
import * as modules from './modules';

import picture from './assets/picture.png';
import content from './assets/content.png';

export default {
    name: 'NES',
    developer: 'Nintendo',
    year: 1983,
    generation: 3,
    wikipedia: 'https://en.wikipedia.org/wiki/Super_Nintendo_Entertainment_System',
    github: 'https://github.com/kabukki/wasm-nes',
    path: '/nintendo/nes',
    picture,
    content,
    component (meta) {
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
    },
};
