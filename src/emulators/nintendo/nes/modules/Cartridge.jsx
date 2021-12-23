import React, { useContext } from 'react';

import { HexViewer, EmulatorContext } from '../../../../common';

import Icon from '../../../../assets/cartridge.svg';

export const Cartridge = () => {
    const { meta, debug, emulator } = useContext(EmulatorContext);

    return (
        <div className="space-y-2">
            <div className="flex gap-2 items-center">
                <img className="h-4" src={meta.content} />
                <b className="flex-1">{emulator.rom.name}</b>
            </div>
            <div className="grid grid-cols-2 gap-x-2 items-center">
                <b className="col-span-2">iNES header</b>
                <span>PRG banks</span>
                <span className="font-mono">{debug?.cartridge.ines.prgBanks}</span>
                <span>CHR banks</span>
                <span className="font-mono">{debug?.cartridge.ines.chrBanks}</span>
                <span>CHR type</span>
                <span className="font-mono">{debug?.cartridge.ines.chrType}</span>
                <span>RAM size</span>
                <span className="font-mono">{debug?.cartridge.ines.ram}</span>
                <span>Mapper</span>
                <span className="font-mono">{debug?.cartridge.ines.mapper}</span>
                <span>Mirroring</span>
                <span className="font-mono">{debug?.cartridge.ines.mirroring}</span>
                <span>Trainer ?</span>
                <span className="font-mono">{debug?.cartridge.ines.trainer ? 'Yes' : 'No'}</span>
            </div>
            <div>
                <b>RAM</b>
                <HexViewer buffer={debug?.cartridge.ram || []} className="h-80 overflow-auto" />
                {/* <b className="col-span-2">ROM</b>
                <HexViewer buffer={debug?.cartridge.rom || []} className="h-80 overflow-auto" /> */}
            </div>
        </div>
    );
};

Cartridge.Icon = Icon;
