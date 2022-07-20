import React, { useRef, useEffect, useContext } from 'react';
import pretty from 'pretty-bytes';

import { EmulatorContext } from '../context';
import { Tile } from './Tile';

const PatternTables = ({ patternTables }) => (
    <div className="grid grid-cols-16 gap-px w-fit">
        {patternTables.map((tile, n) => (
            <div key={n} className="hover:outline hover:outline-1 hover:outline-green-700" title={n}>
                <Tile data={tile} className="w-4 h-4" />
            </div>
        ))}
    </div>
);

export const Cartridge = () => {
    const { emulator } = useContext(EmulatorContext);

    return emulator?.debug ? (
        <div className="h-full grid grid-rows-3 divide-y md:grid-cols-3 md:grid-rows-1 md:divide-x md:divide-y-0">
            <div className="flex flex-col divide-y">
                <div className="p-2 font-bold">iNES header</div>
                <div className="p-2 grid grid-cols-2 gap-x-2 items-center overflow-auto">
                    <span>Mapper</span>
                    <span className="font-mono">{emulator.debug.cartridge.ines?.mapper ?? '-'}</span>
                    <span>Mirroring</span>
                    <span className="font-mono">{emulator.debug.cartridge.ines?.mirroring ?? '-'}</span>
                    <span>Trainer ?</span>
                    <span className="font-mono">{emulator.debug.cartridge.ines?.trainer ? 'Yes' : 'No'}</span>
                </div>
            </div>
            <div className="flex flex-col divide-y">
                <div className="p-2 font-bold">PRG</div>
                <div className="p-2 grid grid-cols-2 gap-x-2 overflow-auto">
                    <span>Total banks</span>
                    <span className="font-mono">{emulator.debug.cartridge.ines?.prg_banks ?? '-'}</span>
                    <span>Selected banks</span>
                    <ul className="font-mono">
                        {emulator.debug.cartridge.prgCurrent?.map((bank) => (
                            <li key={bank.number}>
                                <b>#{bank.number}</b> {pretty(bank.size, { binary: true })}
                            </li>
                        )) ?? '-'}
                    </ul>
                    <span>RAM</span>
                    <span className="font-mono">{emulator.debug.cartridge.ines?.ram ?? '-'}</span>
                </div>
            </div>
            <div className="flex flex-col divide-y">
                <div className="p-2 font-bold">CHR</div>
                <div className="p-2 grid grid-cols-2 gap-x-2 overflow-auto">
                    <span>Total banks</span>
                    <span className="font-mono">{emulator.debug.cartridge.ines?.chr_banks ?? '-'}</span>
                    <span>Selected banks</span>
                    <ul className="font-mono">
                        {emulator.debug.cartridge.chrCurrent?.map((bank) => (
                            <li key={bank.number}>
                                <b>#{bank.number}</b> {pretty(bank.size, { binary: true })}
                            </li>
                        )) ?? '-'}
                    </ul>
                    <span>Type</span>
                    <span className="font-mono">{emulator.debug.cartridge.ines?.chr_type ?? '-'}</span>
                    <PatternTables patternTables={emulator.debug.cartridge.patternTables?.slice(0, 256) || []} />
                    <PatternTables patternTables={emulator.debug.cartridge.patternTables?.slice(256, 512) || []} />
                </div>
            </div>
        </div>
    ) : (
        <p className="h-full flex items-center justify-center">No data :(</p>
    );
};
