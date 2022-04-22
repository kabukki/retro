import React from 'react';
import pretty from 'pretty-ms';
import { useDebug } from '@kabukki/wasm-chip8';
import { AreaClosed } from '@visx/shape';
import { scaleLinear } from '@visx/scale';
import { GridColumns, GridRows } from '@visx/grid';
import { withParentSize } from '@visx/responsive';
import { curveMonotoneX } from '@visx/curve';
import colors from 'tailwindcss/colors';
import { rgba } from 'polished';

const Histogram = withParentSize(({ history, parentWidth, parentHeight }) => {
    if (history) {
        const data = Array.from({ length: history.deltas.length }, (v, n) => ({ fps: 1000 / history.deltas[n], timestamp: history.timestamps[n] }));
    
        const xScale = scaleLinear({
            domain: [Math.min(...data.map(({ timestamp }) => timestamp)), Math.max(...data.map(({ timestamp }) => timestamp))],
            range: [0, parentWidth],
        });
        
        const yScale = scaleLinear({
            domain: [0, 60],
            range: [parentHeight, 0],
        });
    
        return (
            <svg width={parentWidth} height={parentHeight}>
                <GridRows scale={yScale} width={parentWidth} height={parentHeight} stroke={colors.gray[200]} numTicks={6} />
                <GridColumns scale={xScale} width={parentWidth} height={parentHeight} stroke={colors.gray[200]} />
                <AreaClosed
                    data={data}
                    x={record => xScale(record.timestamp)}
                    y={record => yScale(record.fps)}
                    strokeWidth={1}
                    stroke={colors.green[700]}
                    fill={rgba(colors.green[700], 0.5)}
                    curve={curveMonotoneX}
                    yScale={yScale}
                />
            </svg>
        );
    } else {
        return <p className="p-2 text-center">No data :(</p>
    }
});

export const Performance = () => {
    const { performance } = useDebug();

    return (
        <div className="divide-y">
            <div className="p-2 grid grid-cols-2 gap-x-2 items-center">
                <b className="col-span-2">Elapsed time</b>
                <span>Real</span>
                <span className="font-mono">{performance ? pretty(performance.timestamp, { colonNotation: true, keepDecimalsOnWholeSeconds: true, secondsDecimalDigits: 3 }) : '-'}</span>
            </div>
            <div className="p-2 grid grid-cols-2 gap-x-2 items-center">
                <b className="col-span-2">Frames</b>
                <span>FPS</span>
                <span className="font-mono">{performance?.fps?.toString() || '-'}</span>
                <span>Delta</span>
                <span className="font-mono">{performance ? pretty(performance?.delta) : '-'}</span>
                <span>Current</span>
                <span className="font-mono">{performance?.frame?.toString() || '-'}</span>
                <div className="h-32 col-span-2">
                    <Histogram history={performance?.history} />
                </div>
            </div>
            <div className="p-2 text-green-700 text-center font-bold">
                ℹ️ If you experience performance issues, make sure your devtools panel is closed.
            </div>
        </div>
    );
};
