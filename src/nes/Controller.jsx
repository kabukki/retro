import React, { memo } from 'react';
import { Button } from '@kabukki/wasm-nes';

import nes from '../assets/nes_controller.png';
import Keyboard from '../assets/keyboard.svg';
import Gamepad from '../assets/gamepad.svg';

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

export const Controller = memo(({ input, keyboard, gamepad }) => {
    return (
        <div>
            <img src={nes} className="max-h-20 mx-auto" />
            <div className="flex flex-wrap gap-2 justify-center items-center">
                {keys.map((key) => (
                    <span key={key.label} className={`text-${(input & key.mask) > 0 ? 'green-700' : 'current'}`}>
                        {key.label}
                    </span>
                ))}
            </div>
            <div className="flex flex-wrap gap-2 justify-center items-center">
                {keyboard && <Keyboard className="h-4" />}
                {gamepad && <Gamepad className="h-4" />}
            </div>
        </div>
    );
});
