import React, { useContext } from 'react';
import Select from 'react-select';
import { Tab } from '@headlessui/react';

import { EmulatorContext } from '../common';
import { Keypad } from './Keypad';
import { hex } from '../utils';

const selectStyles = {
    control: () => ({
        display: 'flex',
    }),
    menu: (provided) => ({
        ...provided,
        margin: 0,
    }),
    menuList: (provided) => ({
        ...provided,
        padding: 0,
    }),
    option: (provided, { isSelected, isFocused }) => ({
        ...provided,
        backgroundColor: isSelected ? '#047857' : isFocused ? '#D1FAE5' : 'initial',
        color: isSelected ? '#fff' : isFocused ? '#000' : 'initial',
    }),
};

export const Settings = ({ onStop, onClose }) => {
    const { settings, input } = useContext(EmulatorContext);

    return (
        <div className="flex flex-col gap-4 container mx-auto h-full">
            <Tab.Group>
                <Tab.List className="flex flex-col sm:flex-row" as="ul">
                    <Tab className={({ selected }) => `flex-1 text-center font-bold ${selected ? 'bg-white text-black' : ''}`} as="li">Input</Tab>
                    <Tab className={({ selected }) => `flex-1 text-center font-bold ${selected ? 'bg-white text-black' : ''}`} as="li">Interface</Tab>
                </Tab.List>
                <Tab.Panels className="flex-1">
                    <Tab.Panel>
                        <Keypad input={input} />
                        <ul>
                            {Object.entries(settings.input.map).map(([key, value]) => (
                                <li key={key}>
                                    <b>{key}</b>: {hex(value, 0)}
                                </li>
                            ))}
                        </ul>
                    </Tab.Panel>
                    <Tab.Panel>
                        <label className="block">
                            <b>ON</b> color
                            <input type="color" value={settings.ui.colorOn} onChange={(e) => settings.setUI((previous) => ({ ...previous, colorOn: e.target.value }))}/>
                        </label>
                        <label className="block">
                            <b>OFF</b> color
                            <input type="color" value={settings.ui.colorOff} onChange={(e) => settings.setUI((previous) => ({ ...previous, colorOff: e.target.value }))}/>
                        </label>
                        <label>
                            <input type="checkbox" checked={settings.ui.crt} onChange={e => settings.setUI((previous) => ({ ...previous, crt: e.target.checked }))} />
                            CRT filter
                        </label>
                        <label>
                            <input type="checkbox" checked={settings.ui.audio} onChange={(e) => settings.setUI((previous) => ({ ...previous, audio: e.target.checked }))} />
                            Sound <b>{settings.ui.audio ? 'ON' : 'OFF'}</b>
                        </label>
                        <Select
                            styles={selectStyles}
                            value={settings.modules}
                            onChange={settings.setModules}
                            options={['stats', 'input', 'debug']}
                            getOptionLabel={(module) => module}
                            getOptionValue={(module) => module}
                            isSearchable
                            isClearable
                            isMulti
                        />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
            <div className="flex justify-center gap-4">
                <button className="p-1 text-red-500" onClick={onStop}>Stop</button>
                <button onClick={onClose}>Resume</button>
            </div>
        </div>
    );
};
