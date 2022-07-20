import React, { Fragment, useContext, useState } from 'react';
import { PpuCtrlFlag, PpuMaskFlag, PpuStatusFlag, SpriteAttribute } from '@kabukki/wasm-nes';
import classNames from 'classnames';

import { hex } from '../../../../utils';
import { Byte } from '../../../../common';
import { EmulatorContext } from '../context';
import { Flags } from './Flags';
import { Tile } from './Tile';

const Frame = ({ dot, scanline }) => (
    <div className="relative bg-green-100 border" style={{ width: 341, height: 262 }}>
        <div className="absolute bg-green-200" style={{ left: 0, top: 1, width: 256, height: 240 }} />
        <div className="absolute bg-green-300" style={{ left: 0, top: scanline, width: '100%', height: 1 }} />
        <div className="absolute bg-green-300" style={{ left: dot, top: 0, width: 1, height: '100%' }} />
        <div className="absolute bg-green-700" style={{ left: dot, top: scanline, width: 1, height: 1 }} />
    </div>
);

const Palette = ({ palette, className }) => (
    <div className={classNames(className, 'flex')}>
        {palette.map((color, n) => (
            <div key={n} className="w-4 h-4" style={{ background: `#${color.toString(16).padStart(6, 0)}` }} />
        ))}
    </div>
);

const Palettes = ({ palettes }) => {
    const groups = [
        { name: 'Background', palettes: palettes.slice(0, 4) },
        { name: 'Foreground', palettes: palettes.slice(4, 8) },
    ];

    return groups.map(({ name, palettes }) => (
        <div key={name} className="flex gap-2 items-center">
            <span>{name}</span>
            {palettes.map((palette, n) => <Palette key={n} palette={palette} />)}
        </div>
    ));
};

const OAM = ({ oam, palettes }) => {
    const [focusIndex, setFocusIndex] = useState(null);

    const focus = focusIndex !== null ? oam[focusIndex] : null;

    return (
        <div>
            <div className="flex gap-2 items-start">
                <div className="grid grid-cols-8 gap-px w-fit">
                    {oam.map((sprite, n) => (
                        <div
                            key={n}
                            title={n}
                            className={classNames('cursor-pointer transition-transform hover:scale-150', n === focusIndex && 'outline outline-1 outline-green-700')}
                            onClick={() => setFocusIndex(n)}
                        >
                            <Tile data={sprite.tile} />
                        </div>
                    ))}
                </div>
                {focus ? (
                    <div className="flex gap-2 items-start">
                        <Tile data={focus.tile} className="w-8" />
                        <div>
                            <b>
                                Sprite #{focusIndex}: {focus.id} @ (
                                    <span className={focus.x < 256 ? 'text-green-700' : 'text-red-700'}>{focus.x}</span>;
                                    <span className={focus.y < 240 ? 'text-green-700' : 'text-red-700'}>{focus.y}</span>
                                )
                            </b>
                            <div><input type="checkbox" checked={(focus.attr & SpriteAttribute.FlipVertical) > 0} disabled /> Vertical flip</div>
                            <div><input type="checkbox" checked={(focus.attr & SpriteAttribute.FlipHorizontal) > 0} disabled /> Horizontal flip</div>
                            <div><input type="checkbox" checked={(focus.attr & SpriteAttribute.Priority) > 0} disabled /> Priority</div>
                            <div>
                                Palette {focus.attr & SpriteAttribute.Palette}
                                <Palette palette={palettes[4 + (focus.attr & SpriteAttribute.Palette)]} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <i>Click on any sprite to inspect it</i>
                )}
            </div>
            <div>
                Preview
                <div className="relative border" style={{ width: 256, height: 240, backgroundColor: `#${palettes[0]?.[0]?.toString(16).padStart(6, 0)}` }}>
                    {oam.map((sprite, n) => (sprite.x < 256 && sprite.y < 240) && (
                        <div
                            key={n}
                            title={`#${n}: ${sprite.id} @ (${sprite.x};${sprite.y})`}
                            className={classNames('absolute cursor-pointer transition-transform hover:scale-150', n === focusIndex && 'outline outline-1 outline-green-700')}
                            style={{ left: sprite.x, top: sprite.y }}
                            onClick={() => setFocusIndex(n)}
                        >
                            <Tile data={sprite.tile} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const Ppu = () => {
    const { emulator } = useContext(EmulatorContext);

    return emulator?.debug ? (
        <div className="h-full grid grid-rows-3 divide-y md:grid-cols-3 md:grid-rows-1 md:divide-x md:divide-y-0">
            <div className="flex flex-col divide-y">
                <div className="p-2 font-bold">PPU</div>
                <div className="p-2 grid grid-cols-2 gap-x-2 items-center overflow-auto">
                    <span>Controller</span>
                    <div className="flex gap-2 font-mono">
                        <Byte value={emulator.debug.ppu.ctrl} format={hex.with({ padding: 2 })} />
                        <Flags bits={[
                            { name: 'V', description: 'NMI on VBlank', enabled: (emulator.debug.ppu.ctrl & PpuCtrlFlag.VBlank) > 0 },
                            { name: 'P', description: 'PPU master/slave', enabled: (emulator.debug.ppu.ctrl & PpuCtrlFlag._Master) > 0 },
                            { name: 'H', description: 'Sprite size', enabled: (emulator.debug.ppu.ctrl & PpuCtrlFlag.SpriteHeight) > 0 },
                            { name: 'B', description: 'Background pattern table address', enabled: (emulator.debug.ppu.ctrl & PpuCtrlFlag.Bakckground) > 0 },
                            { name: 'S', description: 'Sprite pattern table address for 8x8 sprites', enabled: (emulator.debug.ppu.ctrl & PpuCtrlFlag.Sprite) > 0 },
                            { name: 'I', description: 'VRAM address increment per CPU read/write of PPUDATA', enabled: (emulator.debug.ppu.ctrl & PpuCtrlFlag.Increment) > 0 },
                            { name: 'NN', description: 'Base nametable address', enabled: (emulator.debug.ppu.ctrl & PpuCtrlFlag.Nametable) > 0 },
                        ]} />
                    </div>
                    <span>Mask</span>
                    <div className="flex gap-2 font-mono">
                        <Byte value={emulator.debug.ppu.mask} format={hex.with({ padding: 2 })} />
                        <Flags bits={[
                            { name: 'B', description: 'Emphasize blue', enabled: (emulator.debug.ppu.mask & PpuMaskFlag._Blue) > 0 },
                            { name: 'G', description: 'Emphasize green', enabled: (emulator.debug.ppu.mask & PpuMaskFlag._Green) > 0 },
                            { name: 'R', description: 'Emphasize red', enabled: (emulator.debug.ppu.mask & PpuMaskFlag._Red) > 0 },
                            { name: 's', description: 'Show sprites', enabled: (emulator.debug.ppu.mask & PpuMaskFlag.Foreground) > 0 },
                            { name: 'b', description: 'Show background', enabled: (emulator.debug.ppu.mask & PpuMaskFlag.Background) > 0 },
                            { name: 'M', description: 'Show sprites in leftmost 8 pixels of screen', enabled: (emulator.debug.ppu.mask & PpuMaskFlag.SpritesLeft) > 0 },
                            { name: 'm', description: 'Show background in leftmost 8 pixels of screen', enabled: (emulator.debug.ppu.mask & PpuMaskFlag.BackgroundLeft) > 0 },
                            { name: 'G', description: 'Greyscale', enabled: (emulator.debug.ppu.mask & PpuMaskFlag._Greyscale) > 0 },
                        ]} />
                    </div>
                    <span>Status</span>
                    <div className="flex gap-2 font-mono">
                        <Byte value={emulator.debug.ppu.status} format={hex.with({ padding: 2 })} />
                        <Flags bits={[
                            { name: 'V', description: 'Vertical blank', enabled: (emulator.debug.ppu.status & PpuStatusFlag.VBlank) > 0 },
                            { name: 'S', description: 'Sprite 0 hit', enabled: (emulator.debug.ppu.status & PpuStatusFlag.Hit) > 0 },
                            { name: 'O', description: 'Sprite overflow', enabled: (emulator.debug.ppu.status & PpuStatusFlag.Overflow) > 0 },
                            { name: '.....', enabled: false },
                        ]} />
                    </div>
                    <div className="col-span-2">
                        Palettes
                        <Palettes palettes={emulator.debug.ppu.palettes || []} />
                        <Palette palette={emulator.debug.ppu.palette || []} className="flex-wrap w-64" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col divide-y">
                <div className="p-2 font-bold">Frame timing</div>
                <div className="p-2 grid grid-cols-2 gap-x-2 items-center overflow-auto">
                    <span>Frame</span>
                    <span className="font-mono">{emulator.debug.ppu.frame}</span>
                    <span>Dot</span>
                    <span className="font-mono">{emulator.debug.ppu.dot}</span>
                    <span>Scanline</span>
                    <span className="font-mono">{emulator.debug.ppu.scanline}</span>
                    <Frame dot={emulator.debug.ppu.dot} scanline={emulator.debug.ppu.scanline} />
                </div>
            </div>
            <div className="flex flex-col divide-y">
                <div className="p-2 font-bold">OAM</div>
                <div className="p-2 overflow-auto">
                    <OAM oam={emulator.debug.ppu.oam || []} palettes={emulator.debug.ppu.palettes || []} />
                </div>
            </div>
        </div>
    ) : (
        <p className="h-full flex items-center justify-center">No data :(</p>
    );
};
