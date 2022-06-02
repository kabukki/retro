import React from 'react';
import { useIO } from '@kabukki/wasm-chip8';
import { LinePath } from '@visx/shape';
import { scaleLinear } from '@visx/scale';
import { withParentSize } from '@visx/responsive';
import { curveMonotoneX } from '@visx/curve';
import { AxisBottom } from '@visx/axis';
import { GridColumns, GridRows } from '@visx/grid';
import colors from 'tailwindcss/colors';

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
    const { audio } = useIO();

    const onVolume = (e) => audio.volume(e.target.valueAsNumber);
    const onFrequency = (e) => audio.frequency(e.target.valueAsNumber);
    const onType = (e) => audio.type(e.target.value);

    if (audio) {
        return (
            <div className="p-2 grid grid-cols-2">
                <span>Sample rate</span>
                {audio.sampleRate.toLocaleString()} Hz
                <span>Volume</span>
                <input type="range" min={0} max={1} step={0.01} defaultValue={1} onChange={onVolume} />
                <span>Frequency</span>
                <input type="range" min={20} max={20000} step={1} defaultValue={440} onChange={onFrequency} />
                <span>Type</span>
                <select className="bg-transparent outline-none" defaultValue={audio.baseType} onChange={onType}>
                    <option value="sawtooth">Sawtooth</option>
                    <option value="sine">Sine</option>
                    <option value="square">Square</option>
                    <option value="triangle">Triangle</option>
                </select>
                <span className="col-span-2">Sound wave</span>
                <div className="h-32 col-span-2">
                    <Signal data={audio.data.timeDomain} />
                </div>
                <span className="col-span-2">Frequency spectrum</span>
                <div className="h-32 col-span-2">
                    <Spectrum data={audio.data.frequency} sampleRate={audio.sampleRate} />
                </div>
            </div>
        );
    } else {
        return <p className="p-2 text-center">No data :(</p>
    }
};
