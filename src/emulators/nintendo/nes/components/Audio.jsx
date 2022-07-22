import React, { useContext } from 'react';
import { LinePath } from '@visx/shape';
import { scaleLinear } from '@visx/scale';
import { withParentSize } from '@visx/responsive';
import { curveMonotoneX } from '@visx/curve';
import { AxisBottom } from '@visx/axis';
import { GridColumns, GridRows } from '@visx/grid';
import colors from 'tailwindcss/colors';
import { prefix } from 'metric-prefix';

import { EmulatorContext } from '../context';

const Signal = withParentSize(({ data, parentWidth, parentHeight }) => {
    const xScale = scaleLinear({
        domain: [0, data.length - 1],
        range: [25, parentWidth - 25],
    });
    
    const yScale = scaleLinear({
        domain: [0, 255],
        range: [parentHeight - 25, 25],
    });

    return (
        <svg width={parentWidth} height={parentHeight}>
            <LinePath
                data={data}
                x={(_, n) => xScale(n)}
                y={yScale}
                curve={curveMonotoneX}
                stroke={colors.green[700]}
            />
        </svg>
    );
});

const Spectrum = withParentSize(({ data, sampleRate, parentWidth, parentHeight }) => {
    const xMax = sampleRate / 2;
    const xScale = scaleLinear({
        domain: [0, xMax],
        range: [25, parentWidth - 25],
    });

    const yScale = scaleLinear({
        domain: [0, 255],
        range: [parentHeight - 25, 0],
    });

    return (
        <svg width={parentWidth} height={parentHeight}>
            <GridRows scale={yScale} left={25} width={parentWidth - 50} height={parentHeight - 25} stroke={colors.gray[200]} />
            <GridColumns scale={xScale} left={25} width={parentWidth - 50} height={parentHeight - 25} stroke={colors.gray[200]} />
            <AxisBottom top={parentHeight - 25} scale={xScale} />
            <LinePath
                data={Array.from(data)}
                x={(_, n) => xScale(n * xMax / data.length)}
                y={yScale}
                curve={curveMonotoneX}
                stroke={colors.green[700]}
            />
        </svg>
    );
});

export const Audio = () => {
    const { emulator } = useContext(EmulatorContext);

    const onVolume = (e) => emulator.audio.volume = e.target.valueAsNumber;

    return emulator.audio ? (
        <div className="space-y-2">
            <div className="grid grid-cols-2 gap-x-2 items-center">
                {/* <button className="col-span-2" onClick={() => emulator.audio.fix()}>Fix audio</button> */}
                <span>Sample rate</span>
                {emulator?.audio ? prefix(emulator?.audio?.sampleRate, { unit: 'Hz' }) : '-'}
                <span>Volume</span>
                <input type="range" min={0} max={1} step={0.01} defaultValue={emulator?.audio.volume} onChange={onVolume} />
            </div>
            <div className="grid grid-cols-2 gap-x-2 items-center">
                <span className="col-span-2">Sound wave</span>
                <div className="h-32 col-span-2">
                    <Signal data={emulator.audio.data.timeDomain} />
                </div>
                <span className="col-span-2">Frequency spectrum</span>
                <div className="h-32 col-span-2">
                    <Spectrum data={emulator.audio.data.frequency} sampleRate={emulator.audio.sampleRate} />
                </div>
            </div>
        </div>
    ) : (
        <p className="p-2 text-center">No data :(</p>
    );
};
