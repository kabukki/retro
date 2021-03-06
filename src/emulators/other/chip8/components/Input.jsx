import React, { useContext } from 'react';
import classNames from 'classnames';

import { EmulatorContext } from '../context';
import { Settings } from '.';

const Keypad = ({ input, className }) => (
    <svg className={className} viewBox="0 0 330.66665 261.33331">
        <g transform="matrix(1.3333333,0,0,-1.3333333,-5.3333332,303.99999)">
            <path transform="translate(248,204.937)" fill="#ffffff" d="m 0,0 v 2.126 c 2.454,2.199 4,5.391 4,8.937 0,6.617 -5.383,12 -12,12 h -224 c -6.617,0 -12,-5.383 -12,-12 0,-3.546 1.546,-6.738 4,-8.937 V 0 c -2.454,-2.199 -4,-5.391 -4,-8.937 v -152 c 0,-6.617 5.383,-12 12,-12 h 96 28 100 c 6.617,0 12,5.383 12,12 v 152 C 4,-5.391 2.454,-2.199 0,0" />
            <path fill="#333333" d="M 240,196 H 16 v 20 h 224 z" />
            <path transform="translate(240,212)" fill="#4c4c4c" d="m 0,0 h -224 c -2.209,0 -4,1.791 -4,4 0,2.209 1.791,4 4,4 H 0 C 2.209,8 4,6.209 4,4 4,1.791 2.209,0 0,0" />
            <path transform="translate(114,212)" fill="#404040" d="m 0,0 c 1.104,0 2,-0.896 2,-2 v -8 c 0,-1.104 -0.896,-2 -2,-2 h -76 c -1.104,0 -2,0.896 -2,2 v 8 c 0,1.104 0.896,2 2,2 H 0" />
            <path transform="translate(214,212)" fill="#404040" d="m 0,0 c 1.104,0 2,-0.896 2,-2 v -8 c 0,-1.104 -0.896,-2 -2,-2 h -76 c -1.104,0 -2,0.896 -2,2 v 8 c 0,1.104 0.896,2 2,2 H 0" />
            <path transform="translate(240,40)" fill="#4c4c4c" d="m 0,0 h -224 c -2.209,0 -4,1.791 -4,4 v 152 c 0,2.209 1.791,4 4,4 H 0 c 2.209,0 4,-1.791 4,-4 V 4 C 4,1.791 2.209,0 0,0" />
            <path fill="#a3834a" d="m 44,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 48,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 52,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 56,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 60,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 64,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 68,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 72,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 76,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 80,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 84,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 88,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 92,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 96,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 100,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 104,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 108,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 112,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 142,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 146,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 150,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 154,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 158,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 162,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 166,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 170,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 174,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 178,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 182,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 186,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 190,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 194,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 198,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 202,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 206,204 h -2 v 4 h 2 z" />
            <path fill="#a3834a" d="m 210,204 h -2 v 4 h 2 z" />
            <path transform="translate(66,168)" fill="#333333" d="m 0,0 h -20 c -1.104,0 -2,0.896 -2,2 0,1.104 0.896,2 2,2 H 0 C 1.104,4 2,3.104 2,2 2,0.896 1.104,0 0,0" />
            <path transform="translate(66,156)" fill="#333333" d="m 0,0 h -20 c -1.104,0 -2,0.896 -2,2 0,1.104 0.896,2 2,2 H 0 C 1.104,4 2,3.104 2,2 2,0.896 1.104,0 0,0" />
            <path transform="translate(66,144)" fill="#333333" d="m 0,0 h -20 c -1.104,0 -2,0.896 -2,2 0,1.104 0.896,2 2,2 H 0 C 1.104,4 2,3.104 2,2 2,0.896 1.104,0 0,0" />
            <path transform="translate(66,132)" fill="#333333" d="m 0,0 h -20 c -1.104,0 -2,0.896 -2,2 0,1.104 0.896,2 2,2 H 0 C 1.104,4 2,3.104 2,2 2,0.896 1.104,0 0,0" />
            <path transform="translate(66,120)" fill="#333333" d="m 0,0 h -20 c -1.104,0 -2,0.896 -2,2 0,1.104 0.896,2 2,2 H 0 C 1.104,4 2,3.104 2,2 2,0.896 1.104,0 0,0" />
            <path transform="translate(66,108)" fill="#333333" d="m 0,0 h -20 c -1.104,0 -2,0.896 -2,2 0,1.104 0.896,2 2,2 H 0 C 1.104,4 2,3.104 2,2 2,0.896 1.104,0 0,0" />
            <path transform="translate(66,96)" fill="#333333" d="m 0,0 h -20 c -1.104,0 -2,0.896 -2,2 0,1.104 0.896,2 2,2 H 0 C 1.104,4 2,3.104 2,2 2,0.896 1.104,0 0,0" />
            <path transform="translate(66,84)" fill="#333333" d="m 0,0 h -20 c -1.104,0 -2,0.896 -2,2 0,1.104 0.896,2 2,2 H 0 C 1.104,4 2,3.104 2,2 2,0.896 1.104,0 0,0" />
            <path transform="translate(140,40)" fill="#333333" d="m 0,0 h -28 l 4,4 h 20 z" />
            <path transform="translate(142,64)" fill="#333333" d="m 0,0 v 0 c -5.522,0 -10,4.478 -10,10 v 36 c 0,5.522 4.478,10 10,10 5.522,0 10,-4.478 10,-10 V 10 C 10,4.478 5.522,0 0,0" />
            <path transform="translate(142,68)" fill="#4c4c4c" d="m 0,0 v 0 c -3.313,0 -6,2.687 -6,6 v 36 c 0,3.313 2.687,6 6,6 3.313,0 6,-2.687 6,-6 V 6 C 6,2.687 3.313,0 0,0" />
            <path transform="translate(140,110)" fill="#ff0000" d="M 0,0 C 0,-1.104 0.896,-2 2,-2 3.104,-2 4,-1.104 4,0 4,1.104 3.104,2 2,2 0.896,2 0,1.104 0,0" />
            <path transform="translate(140,98)" fill="#7b0000" d="M 0,0 C 0,-1.104 0.896,-2 2,-2 3.104,-2 4,-1.104 4,0 4,1.104 3.104,2 2,2 0.896,2 0,1.104 0,0" />
            <path transform="translate(140,86)" fill="#7b0000" d="M 0,0 C 0,-1.104 0.896,-2 2,-2 3.104,-2 4,-1.104 4,0 4,1.104 3.104,2 2,2 0.896,2 0,1.104 0,0" />
            <path transform="translate(136,80)" fill="#404040" d="m 0,0 v -6 c 0,-3.313 2.687,-6 6,-6 3.313,0 6,2.687 6,6 v 6 z" />
            <path transform="translate(146,72)" fill="#808080" d="m 0,0 c 0,-2.209 -1.791,-4 -4,-4 -2.209,0 -4,1.791 -4,4 0,2.209 1.791,4 4,4 2.209,0 4,-1.791 4,-4" />
            <path transform="translate(142,72)" fill="#999999" d="M 0,0 V 0 C -1.104,0 -2,0.896 -2,2 V 6 C -2,7.104 -1.104,8 0,8 1.104,8 2,7.104 2,6 V 2 C 2,0.896 1.104,0 0,0" />
            <path transform="translate(220,52)" fill="#333333" d="m 0,0 h -60 c -2.209,0 -4,1.791 -4,4 v 60 c 0,2.209 1.791,4 4,4 H 0 c 2.209,0 4,-1.791 4,-4 V 4 C 4,1.791 2.209,0 0,0" />
            <path fill="#cccccc" d="m 216,60 h -52 v 52 h 52 z" />
            <path fill={input[0x1] ? 'white' : '#e6e6e6'} d="m 176,100 h -8 v 8 h 8 z" />
            <path fill={input[0x2] ? 'white' : '#e6e6e6'} d="m 188,100 h -8 v 8 h 8 z" />
            <path fill={input[0x3] ? 'white' : '#e6e6e6'} d="m 200,100 h -8 v 8 h 8 z" />
            <path fill={input[0xC] ? 'white' : '#e6e6e6'} d="m 212,100 h -8 v 8 h 8 z" />
            <path fill={input[0x4] ? 'white' : '#e6e6e6'} d="m 176,88 h -8 v 8 h 8 z" />
            <path fill={input[0x5] ? 'white' : '#e6e6e6'} d="m 188,88 h -8 v 8 h 8 z" />
            <path fill={input[0x6] ? 'white' : '#e6e6e6'} d="m 200,88 h -8 v 8 h 8 z" />
            <path fill={input[0xD] ? 'white' : '#e6e6e6'} d="m 212,88 h -8 v 8 h 8 z" />
            <path fill={input[0x7] ? 'white' : '#e6e6e6'} d="m 176,76 h -8 v 8 h 8 z" />
            <path fill={input[0x8] ? 'white' : '#e6e6e6'} d="m 188,76 h -8 v 8 h 8 z" />
            <path fill={input[0x9] ? 'white' : '#e6e6e6'} d="m 200,76 h -8 v 8 h 8 z" />
            <path fill={input[0xE] ? 'white' : '#e6e6e6'} d="m 212,76 h -8 v 8 h 8 z" />
            <path fill={input[0xA] ? 'white' : '#e6e6e6'} d="m 176,64 h -8 v 8 h 8 z" />
            <path fill={input[0x0] ? 'white' : '#e6e6e6'} d="m 188,64 h -8 v 8 h 8 z" />
            <path fill={input[0xB] ? 'white' : '#e6e6e6'} d="m 200,64 h -8 v 8 h 8 z" />
            <path fill={input[0xF] ? 'white' : '#e6e6e6'} d="m 212,64 h -8 v 8 h 8 z" />
        </g>
    </svg>
);

const order = [
    0x1, 0x2, 0x3, 0xC,
    0x4, 0x5, 0x6, 0xD,
    0x7, 0x8, 0x9, 0xE,
    0xA, 0x0, 0xB, 0xF,
];

export const Input = () => {
    const { emulator } = useContext(EmulatorContext);
    const [{ keymap }, setSettings] = useContext(Settings);

    const onKey = (key) => (e) => {
        setSettings((previous) => ({
            ...previous,
            keymap: {
                ...previous.keymap,
                [key]: e.key,
            },
        }));
    };

    const entries = Object.entries(keymap).map(([key, mapped]) => [Number(key), mapped]).sort(([a], [b]) => order.indexOf(a) - order.indexOf(b));

    return (
        <div className="grid grid-cols-2 divide-x">
            <div className="p-2">
                <Keypad className="h-32" input={emulator.debug?.input} />
            </div>
            <div className="p-2 grid grid-cols-4 grid-rows-4 gap-2">
                {entries.map(([key, mapped]) => (
                    <label key={key} className={classNames('flex items-center gap-2', { 'text-green-700': emulator.debug?.input?.[key] })}>
                        <b className="font-mono">{key.toString(16).toUpperCase()}</b>
                        <input className="w-0 flex-1 text-center" type="text" value={mapped} readOnly onKeyDown={onKey(key)} />
                    </label>
                ))}
            </div>
        </div>
    );
};
