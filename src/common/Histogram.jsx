import React from 'react';
import { AreaClosed, Line } from '@visx/shape';
import { scaleLinear } from '@visx/scale';
import { GridColumns, GridRows } from '@visx/grid';
import { withParentSize } from '@visx/responsive';
import { curveMonotoneX } from '@visx/curve';
import colors from 'tailwindcss/colors';
import { rgba } from 'polished';

export const Histogram = withParentSize(({ history, average, parentWidth, parentHeight }) => {
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
                <Line
                    from={{ x: 0, y: yScale(average) }}
                    to={{ x: parentWidth, y: yScale(average) }}
                    strokeWidth={1}
                    stroke={colors.green[700]}
                />
            </svg>
        );
    } else {
        return <p className="p-2 text-center">No data :(</p>
    }
});
