import React, { useContext } from 'react';

import { EmulatorContext } from '../common';

import content from '../assets/chip8.content.png';

export const ModuleCartridge = () => {
    const { emulator } = useContext(EmulatorContext);

    return (
        <Module className="grid grid-cols-2 gap-x-2 items-center">
            <div className="col-span-2 flex gap-2 items-center">
                <img className="h-4" src={content} />
                <b className="flex-1">{emulator.rom.name}</b>
            </div>
        </Module>
    );
};
