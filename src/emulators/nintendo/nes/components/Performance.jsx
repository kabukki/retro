import React, { useContext } from 'react';
import prettyMs from 'pretty-ms';
import prettyBytes from 'pretty-bytes';
import { prefix } from 'metric-prefix';

import { Histogram } from '../../../../common';
import { EmulatorContext } from '../context';

export const Performance = () => {
    const { emulator } = useContext(EmulatorContext);

    return emulator?.debug ? (
        <div className="h-full grid grid-rows-2 divide-y md:grid-cols-2 md:grid-rows-1 md:divide-x md:divide-y-0">
            <div className="flex flex-col divide-y">
                <div className="p-2 font-bold">Frames</div>
                <div className="p-2 grid grid-cols-2 gap-x-2 items-center overflow-auto">
                    <span>FPS</span>
                    <span className="font-mono">{emulator.performance.fps || '-'} (avg. {emulator.performance?.fpsAverage})</span>
                    <span>Delta</span>
                    <span className="font-mono">{emulator.performance ? `${prettyMs(emulator.performance.delta)} (avg. ${prettyMs(emulator.performance.deltaAverage)})` : '-'}</span>
                    <span>Current</span>
                    <span className="font-mono">{emulator.performance.frame?.toLocaleString() || '-'}</span>
                    <div className="col-span-2">
                        <div className="h-32">
                            <Histogram history={emulator.performance?.history} average={emulator.performance?.fpsAverage} />
                        </div>
                        <div className="text-green-700 text-center font-bold">
                            ℹ️ If you experience performance issues, make sure your devtools panel is closed.
                        </div>
                    </div>
                    <span>WebAssembly memory usage</span>
                    <span>{prettyBytes(emulator.memory.buffer.byteLength)}</span>
                </div>
            </div>
            <div className="flex flex-col divide-y">
                <div className="p-2 font-bold">Timing</div>
                <div className="p-2 grid grid-cols-2 gap-x-2 items-center overflow-auto">
                    <span>Real</span>
                    <span className="font-mono">{emulator.performance ? prettyMs(emulator.performance.timestamp, { colonNotation: true, keepDecimalsOnWholeSeconds: true, secondsDecimalDigits: 3 }) : '-'}</span>
                    <span>Audio</span>
                    <span className="font-mono">{prettyMs(emulator.audio.time * 1000, { colonNotation: true, keepDecimalsOnWholeSeconds: true, secondsDecimalDigits: 3 })}</span>
                    <span>Emulated</span>
                    <span className="font-mono">{emulator.debug.clock ? `${prettyMs(emulator.debug.clock.time * 1000, { colonNotation: true, keepDecimalsOnWholeSeconds: true, secondsDecimalDigits: 3 })} @ ${prefix(emulator.debug.clock.rate, { unit: 'Hz' })}` : '-'}</span>
                    <span>CPU</span>
                    <span className="font-mono">{emulator.debug.cpu.clock.cycles.toLocaleString()} cycles @ {prefix(emulator.debug.cpu.clock.rate, { unit: 'Hz' })}</span>
                    <span>APU</span>
                    <span className="font-mono">{emulator.debug.apu.clock.cycles.toLocaleString()} cycles @ {prefix(emulator.debug.apu.clock.rate, { unit: 'Hz' })}</span>
                    <span>PPU</span>
                    <span className="font-mono">{emulator.debug.ppu.clock.cycles.toLocaleString()} cycles @ {prefix(emulator.debug.ppu.clock.rate, { unit: 'Hz' })}</span>
                </div>
            </div>
        </div>
    ) : (
        <p className="h-full flex items-center justify-center">No data :(</p>
    );
};
