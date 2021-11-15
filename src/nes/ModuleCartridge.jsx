import React, { useContext } from 'react';

import { Module, EmulatorContext } from '../common';

import content from '../assets/nes.content.png';

export const ModuleCartridge = () => {
    const { debug, rom } = useContext(EmulatorContext);

    return (
        <Module>
            <div className="flex gap-2 items-center ">
                <img className="h-4" src={content} />
                <b className="flex-1">{rom.name}</b>
            </div>
            <div className="p-4 grid grid-cols-2 gap-x-2 items-center rounded bg-black bg-opacity-25">
                <h2>PRG banks</h2>
                {debug?.cartridge.prgBanks}
                <h2>CHR banks</h2>
                {debug?.cartridge.chrBanks}
                <h2>CHR type</h2>
                {debug?.cartridge.chrType}
                <h2>Mapper</h2>
                {debug?.cartridge.mapper}
                <h2>Trainer ?</h2>
                {debug?.cartridge.trainer ? 'Yes' : 'No'}
                <h2>RAM size</h2>
                {debug?.cartridge.ram}
                <h2>Mirroring</h2>
                {debug?.cartridge.mirroring}
            </div>
        </Module>
    );
};
