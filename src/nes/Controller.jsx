import React, { memo } from 'react';
import { Button } from '@kabukki/wasm-nes';

import nes from '../assets/nes_controller.png';

const keys = [
    {
        label: 'A',
        mask: Button.A,
    }, {
        label: 'B',
        mask: Button.B,
    }, {
        label: 'Select',
        mask: Button.Select,
    }, {
        label: 'Start',
        mask: Button.Start,
    }, {
        label: 'Up',
        mask: Button.Up,
    }, {
        label: 'Down',
        mask: Button.Down,
    }, {
        label: 'Left',
        mask: Button.Left,
    }, {
        label: 'Right',
        mask: Button.Right,
    },
];

export const Controller = memo(({ input, disabled }) => {
    return (
        <div className="p-4">
            <img src={nes} className={`max-h-20 mx-auto ${disabled ? 'filter brightness-50' : ''}`} />
            <div className="flex flex-wrap gap-2 justify-center items-center">
                {keys.map((key) => (
                    <span key={key.label} className={`text-${(input & key.mask) > 0 ? 'green-700' : 'current'}`}>
                        {key.label}
                    </span>
                ))}
            </div>
        </div>
    );
});
