import React, { memo, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@kabukki/wasm-nes';
import classNames from 'classnames';

import { Select } from '../../../../common';
import { EmulatorContext } from '../context';
import { SettingsContext } from '../settings';

const formatOptionLabelWithIcon = ({ id, type }) => {
    const typeMap = {
        keyboard: faKeyboard,
        gamepad: faGamepad,
    };

    return (
        <div className="flex items-center gap-2">
            <FontAwesomeIcon className="w-4 h-4" icon={typeMap[type]} />
            <div className="flex-1 truncate">{id}</div>
        </div>
    );
};

const Controller = memo(({ input, className }) => (
    <svg className={className} viewBox="0 0 330.66626 154.66665">
        <g transform="matrix(1.3333333,0,0,-1.3333333,-5.3333332,245.33333)">
            <path transform="translate(239.1667,184)" fill="#ffffff" d="m 0,0 h -222.333 c -7.077,0 -12.834,-5.742 -12.834,-12.8 v -90.4 c 0,-7.058 5.757,-12.8 12.834,-12.8 H 0 c 7.076,0 12.833,5.742 12.833,12.8 v 90.4 C 12.833,-5.742 7.076,0 0,0" />
            <path transform="translate(239.1667,76)" fill="#cccccc" d="m 0,0 h -222.333 c -2.67,0 -4.834,2.149 -4.834,4.8 v 90.4 c 0,2.651 2.164,4.8 4.834,4.8 H 0 c 2.669,0 4.833,-2.149 4.833,-4.8 V 4.8 C 4.833,2.149 2.669,0 0,0" />
            <path fill="#262626" d="M 236,84 H 20 v 80 h 216 z" />
            <path transform="translate(64.2399,146)" fill="#cccccc" d="m 0,0 h -16.48 c -1.04,0 -1.882,-0.843 -1.882,-1.882 v -11.996 h -11.996 c -1.039,0 -1.882,-0.843 -1.882,-1.882 v -16.48 c 0,-1.04 0.843,-1.882 1.882,-1.882 h 11.996 v -11.996 c 0,-1.039 0.842,-1.882 1.882,-1.882 H 0 c 1.039,0 1.882,0.843 1.882,1.882 v 11.996 h 11.996 c 1.039,0 1.882,0.842 1.882,1.882 v 16.48 c 0,1.039 -0.843,1.882 -1.882,1.882 H 1.882 V -1.882 C 1.882,-0.843 1.039,0 0,0" />
            <path transform="translate(78,130.196)" fill="#191919" d="M 0,0 H -13.804 V 13.804 H -30.196 V 0 H -44 v -16.392 h 13.804 v -13.804 h 16.392 v 13.804 H 0 Z" />
            <path transform="translate(192,98.4392)" fill="#cccccc" d="M 0,0 C 0,-1.347 -1.092,-2.439 -2.439,-2.439 H -21.561 C -22.908,-2.439 -24,-1.347 -24,0 v 19.122 c 0,1.347 1.092,2.439 2.439,2.439 H -2.439 C -1.092,21.561 0,20.469 0,19.122 Z" />
            <path transform="translate(191,108)" fill="#7b0000" d="m 0,0 c 0,6.065 -4.935,11 -11,11 -6.065,0 -11,-4.935 -11,-11 0,-6.065 4.935,-11 11,-11 6.065,0 11,4.935 11,11" />
            <path transform="translate(190,108)" fill={(input & Button.B) > 0 ? 'white' : '#b80000'} d="m 0,0 c 0,-5.523 -4.477,-10 -10,-10 -5.523,0 -10,4.477 -10,10 0,5.523 4.477,10 10,10 C -4.477,10 0,5.523 0,0" />
            <path transform="translate(224,98.4392)" fill="#cccccc" d="M 0,0 C 0,-1.347 -1.092,-2.439 -2.439,-2.439 H -21.561 C -22.908,-2.439 -24,-1.347 -24,0 v 19.122 c 0,1.347 1.092,2.439 2.439,2.439 H -2.439 C -1.092,21.561 0,20.469 0,19.122 Z" />
            <path transform="translate(223,108)" fill="#7b0000" d="m 0,0 c 0,6.065 -4.935,11 -11,11 -6.065,0 -11,-4.935 -11,-11 0,-6.065 4.935,-11 11,-11 6.065,0 11,4.935 11,11" />
            <path transform="translate(222,108)" fill={(input & Button.A) > 0 ? 'white' : '#b80000'} d="m 0,0 c 0,-5.523 -4.477,-10 -10,-10 -5.523,0 -10,4.477 -10,10 0,5.523 4.477,10 10,10 C -4.477,10 0,5.523 0,0" />
            <path transform="translate(152,96)" fill="#cccccc" d="m 0,0 h -56 c -2.209,0 -4,1.791 -4,4 v 16 c 0,2.209 1.791,4 4,4 H 0 c 2.209,0 4,-1.791 4,-4 V 4 C 4,1.791 2.209,0 0,0" />
            <path transform="translate(120,108)" fill={(input & Button.Select) > 0 ? 'white' : '#191919'} d="M 0,0 C 0,-2.209 -1.78,-4 -3.976,-4 H -16.024 C -18.22,-4 -20,-2.209 -20,0 c 0,2.209 1.78,4 3.976,4 H -3.976 C -1.78,4 0,2.209 0,0" />
            <path transform="translate(148,108)" fill={(input & Button.Start) > 0 ? 'white' : '#191919'} d="M 0,0 C 0,-2.209 -1.78,-4 -3.976,-4 H -16.024 C -18.22,-4 -20,-2.209 -20,0 c 0,2.209 1.78,4 3.976,4 H -3.976 C -1.78,4 0,2.209 0,0" />
            <path transform="translate(60,122)" fill="#262626" d="m 0,0 c 0,-2.209 -1.791,-4 -4,-4 -2.209,0 -4,1.791 -4,4 0,2.209 1.791,4 4,4 2.209,0 4,-1.791 4,-4" />
            <path transform="translate(54.1263,106.7519)" fill={(input & Button.Down) > 0 ? 'white' : '#262626'} d="M 0,0 V 3.248 H 3.949 V 0 h 1.924 l -4,-4.752 -4,4.752 z" />
            <path transform="translate(57.8731,137.2481)" fill={(input & Button.Up) > 0 ? 'white' : '#262626'} d="M 0,0 V -3.248 H -3.949 V 0 h -1.924 l 4,4.752 4,-4.752 z" />
            <path transform="translate(40.7519,123.8737)" fill={(input & Button.Left) > 0 ? 'white' : '#262626'} d="M 0,0 H 3.248 V -3.949 H 0 v -1.924 l -4.752,4 4.752,4 z" />
            <path transform="translate(71.248,120.1269)" fill={(input & Button.Right) > 0 ? 'white' : '#262626'} d="M 0,0 H -3.248 V 3.949 H 0 v 1.924 l 4.752,-4 -4.752,-4 z" />
            <path transform="translate(156,126.8457)" fill="#808080" d="M 0,0 C 0,-1.572 -1.174,-2.846 -2.623,-2.846 H -61.377 C -62.826,-2.846 -64,-1.572 -64,0 v 6.309 c 0,1.571 1.174,2.845 2.623,2.845 H -2.623 C -1.174,9.154 0,7.88 0,6.309 Z" />
            <path transform="translate(156,142.8457)" fill="#808080" d="M 0,0 C 0,-1.572 -1.174,-2.846 -2.623,-2.846 H -61.377 C -62.826,-2.846 -64,-1.572 -64,0 v 6.309 c 0,1.571 1.174,2.845 2.623,2.845 H -2.623 C -1.174,9.154 0,7.88 0,6.309 Z" />
            <path transform="translate(92,164)" fill="#808080" d="M 0,0 V -5.154 C 0,-6.726 1.174,-8 2.623,-8 H 61.377 C 62.826,-8 64,-6.726 64,-5.154 V 0 Z" />
            <path transform="translate(153.3768,92)" fill="#b3b3b3" d="M 92,172 H 80 v 4 h 12 z" />
        </g>
    </svg>
));

export const Input = () => {
    const { emulator } = useContext(EmulatorContext);
    const [settings] = useContext(SettingsContext);

    const onKey = (input, button) => (e) => {
        input.keymap[button] = e.key;
    };

    return (
        <div className="h-full grid grid-cols-2 divide-x">
            {Array.from(emulator.debug.input).map((input, index) => (
                <div key={index}>
                    <div className="p-2 font-bold border-y">Player {index + 1}</div>
                    <div className="p-2">
                        <Controller className="m-auto max-h-32" input={input} />
                        <Select
                            value={settings.input.players[index]}
                            options={settings.input.inputs}
                            placeholder="Select input source..."
                            onChange={(p) => settings.input.setPlayer(index, p)}
                            getOptionLabel={({ id }) => id}
                            getOptionValue={({ id }) => id}
                            formatOptionLabel={formatOptionLabelWithIcon}
                            isSearchable={false}
                            isClearable
                        />
                        {settings.input.players[index]?.type === 'keyboard' && (
                            <div className="p-2 grid grid-cols-4 grid-rows-4 gap-2">
                                {Object.entries(settings.input.players[index]?.keymap).map(([button, mapped]) => (
                                    <label key={button} className={classNames('flex items-center gap-2', { 'text-green-700': (input & button) > 0 })}>
                                        <b className="font-mono">{Button[button]}</b>
                                        <input className="w-0 flex-1 text-center" type="text" value={mapped} readOnly onKeyDown={onKey(settings.input.players[index], button)} />
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
