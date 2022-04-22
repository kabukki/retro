import React, { useContext } from 'react';

import { EmulatorContext } from '../../../../common';

export const Cartridge = () => {
    const { meta, emulator } = useContext(EmulatorContext);

    return (
        <div className="grid grid-cols-2 gap-x-2 items-center">
            <div className="col-span-2 flex gap-2 items-center">
                <img className="h-4" src={meta.content} />
                <b className="flex-1">{emulator.rom.name}</b>
            </div>
        </div>
    );
};
