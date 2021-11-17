import React, { useContext } from 'react';

import { Module, EmulatorContext } from '../common';

import content from '../assets/nes.content.png';

export const ModuleCartridge = () => {
    const { debug, emulator } = useContext(EmulatorContext);

    return (
        <Module className="grid grid-cols-2 gap-x-2 items-center">
            <div className="mb-2 col-span-2 flex gap-2 items-center">
                <img className="h-4" src={content} />
                <b className="flex-1">{emulator.rom.name}</b>
            </div>
            <h2>PRG banks</h2>
            {debug?.cartridge.prgBanks}
            <h2>CHR banks</h2>
            {debug?.cartridge.chrBanks}
            <h2>CHR type</h2>
            {debug?.cartridge.chrType}
            <h2>RAM size</h2>
            {debug?.cartridge.ram}
            <h2>Mapper</h2>
            {debug?.cartridge.mapper}
            <h2>Mirroring</h2>
            {debug?.cartridge.mirroring}
            <h2>Trainer ?</h2>
            {debug?.cartridge.trainer ? 'Yes' : 'No'}
        </Module>
    );
};
